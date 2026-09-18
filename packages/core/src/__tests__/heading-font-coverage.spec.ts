import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Headings use the --s-font-heading token. By default it equals the text font, so a missing
 * family is invisible: it only shows up in an application that assigns its own heading font.
 * The test requires a family in every `&__title` block.
 */
const root = resolve(process.cwd(), 'src')

/**
 * Components whose titles deliberately stay on the text font. When adding to the list, state
 * the reason — otherwise it becomes a way around the check.
 */
const WITHOUT_HEADING_FONT = new Set<string>([])

/** A `…__title {` rule block with its body. */
const TITLE_BLOCKS = /(?:&|\.[\w-]+)__title\s*\{([^}]*)\}/g

const components = readdirSync(`${root}/components`, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

describe('heading font', () => {
  it.each(components)('%s — titles use --s-font-heading', (name) => {
    const dir = `${root}/components/${name}`
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.scss'))) {
      const css = readFileSync(`${dir}/${file}`, 'utf8')
      for (const [, body] of css.matchAll(TITLE_BLOCKS)) {
        // A layout-only block (flex: 1) carries no typography — the font is set on the trigger.
        if (!/font-/.test(body)) continue
        if (WITHOUT_HEADING_FONT.has(name)) continue
        expect(body, `${name}/${file}`).toContain('var(--s-font-heading)')
      }
    }
  })

  it('the .s-text-h1..h6 utilities use the heading font', () => {
    const css = readFileSync(`${root}/styles/_typography.scss`, 'utf8')
    const rule = /\.s-text-h1,[\s\S]*?\.s-text-h6\s*\{([^}]*)\}/.exec(css)
    expect(rule?.[1]).toContain('var(--s-font-heading)')
  })

  it('text, fields and navigation keep the text font', () => {
    /**
     * reset-inherited sets the font on every component root: the heading font there would
     * render the whole interface in the display face.
     */
    const mixins = readFileSync(`${root}/styles/tools/_mixins.scss`, 'utf8')
    const reset = /@mixin reset-inherited\([^)]*\)\s*\{([^}]*)\}/.exec(mixins)
    expect(reset?.[1]).toContain('var(--s-font-sans)')
  })
})
