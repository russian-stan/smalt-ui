import { existsSync, readdirSync, statSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import * as sass from 'sass'
import { describe, expect, it } from 'vitest'

/**
 * Contract of the vendored fonts. It needs a test because both ways to break the setup are
 * silent: a broken `url()` fails neither the build nor the types, the page just falls back to
 * the system font. The docs showcase also masks it — there Vite compiles the SCSS and rebases
 * the paths, while the package is built by the bare Sass CLI.
 */
const root = resolve(process.cwd(), 'src')
const fontsDir = `${root}/fonts`

const compile = (entry: string) => sass.compile(`${root}/styles/fonts/${entry}`).css

/** "Declared family → url" pairs from the compiled rules, in source order. */
function faces(css: string): { family: string; url: string; weight: string }[] {
  return [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map(([, body]) => ({
    family: /font-family:\s*"([^"]+)"/.exec(body)![1],
    url: /url\("([^"]+)"\)/.exec(body)![1],
    weight: /font-weight:\s*([^;]+);/.exec(body)![1],
  }))
}

describe('dist/fonts.css (_bundled.scss entry)', () => {
  const css = compile('_bundled.scss')
  const rules = faces(css)

  it('declares four subsets of a single family', () => {
    expect(rules).toHaveLength(4)
    expect(new Set(rules.map((r) => r.family))).toEqual(new Set(['Inter']))
  })

  it('every subset is a variable font covering the full axis range', () => {
    for (const { weight } of rules) expect(weight).toBe('100 900')
  })

  it('woff2, swap, normal style and unicode-range everywhere', () => {
    expect(css.match(/format\("woff2"\)/g)).toHaveLength(4)
    expect(css.match(/font-display:\s*swap/g)).toHaveLength(4)
    expect(css.match(/font-style:\s*normal/g)).toHaveLength(4)
    expect(css.match(/unicode-range:/g)).toHaveLength(4)
  })

  it('the ruble sign is covered by the Latin Extended subset', () => {
    const latinExt = /@font-face\s*\{[^}]*Inter-LatinExt[^}]*\}/.exec(css)![0]
    expect(latinExt).toContain('U+20AD-20C0')
  })

  it('paths start with ./fonts/ — the Nuxt module base rewrite relies on it', () => {
    // The module reads the built fonts.css and replaces './fonts/' with the public Nitro baseURL.
    for (const { url } of rules) expect(url.startsWith('./fonts/')).toBe(true)
  })
})

describe('@smalt-ui/core/scss/fonts (_index.scss entry)', () => {
  const rules = faces(compile('_index.scss'))

  it('the default $font-path resolves to src/fonts — the same path is valid in dist', () => {
    expect(rules).toHaveLength(4)
    for (const { url } of rules) {
      expect(url.startsWith('../../fonts/')).toBe(true)
      expect(existsSync(resolve(`${root}/styles/fonts`, url))).toBe(true)
    }
  })

  it('the consumer can override $font-path', () => {
    // loadPaths rather than an absolute path in @use: Sass resolves module specifiers as URLs.
    const css = sass.compileString(`@use 'fonts' with ($font-path: '/assets/fonts/');`, {
      loadPaths: [`${root}/styles`],
    }).css
    for (const { url } of faces(css)) expect(url.startsWith('/assets/fonts/')).toBe(true)
  })
})

describe('font family tokens', () => {
  const css = sass.compile(`${root}/styles/index.scss`).css

  it('the text font is Inter', () => {
    const value = /--s-font-sans:\s*([^;]+);/.exec(css)![1]
    expect(value.startsWith('"Inter", "Inter Variable"')).toBe(true)
  })

  it('the heading font defaults to the text font', () => {
    expect(/--s-font-heading:\s*([^;]+);/.exec(css)![1]).toBe('var(--s-font-sans)')
  })

  it('only the h1..h6 roles get the heading font', () => {
    // The roles share one selector group: the whole rule is parsed, not just its last selector.
    const utilities = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)]
      .filter(([, , body]) => body.includes('var(--s-font-heading)'))
      .flatMap(([, selectors]) => [...selectors.matchAll(/\.s-text-([\w-]+)/g)].map((m) => m[1]))
    expect(new Set(utilities)).toEqual(new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']))
  })
})

describe('font files', () => {
  const declared = faces(compile('_bundled.scss')).map((r) => basename(r.url))
  const present = readdirSync(fontsDir).filter((file) => file.endsWith('.woff2'))

  it('every rule points to an existing file', () => {
    for (const file of declared) expect(existsSync(`${fontsDir}/${file}`)).toBe(true)
  })

  it('every file is declared exactly once — no orphans', () => {
    expect([...declared].sort()).toEqual([...present].sort())
  })

  it('the total font weight stays within budget', () => {
    /**
     * The budget lives in a test rather than size-limit: size-limit runs paths through esbuild,
     * which has no loader for woff2. The threshold keeps vendoring deliberate so that font files
     * are not added "just in case": each one is weight on the critical path.
     */
    const total = present.reduce((sum, file) => sum + statSync(`${fontsDir}/${file}`).size, 0)
    expect(total).toBeLessThan(190 * 1024)
  })
})
