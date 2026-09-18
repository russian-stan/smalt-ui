import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

/**
 * Appends extensions to relative specifiers in .d.ts files: vue-tsc emits them as in the sources
 * (`./components`), and a consumer with `moduleResolution: node16`/`nodenext` ends up without
 * types. Bundler resolution still works, so the defect is invisible inside the monorepo; it is
 * caught by `pnpm lint:pkg` (InternalResolutionError from @arethetypeswrong/cli).
 */
const dist = fileURLToPath(new URL('../dist', import.meta.url))

function collect(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...collect(path))
    else if (entry.name.endsWith('.d.ts')) out.push(path)
  }
  return out
}

/**
 * Resolves a specifier to a path with an extension: file → `X.js`, directory → `X/index.js`.
 * Returns null if the target is not found; such a specifier is left as is and the script fails:
 * silently shipping unresolvable types is worse than breaking the build.
 */
function withExtension(fromFile, specifier) {
  const base = resolve(dirname(fromFile), specifier)
  if (existsSync(`${base}.d.ts`)) return `${specifier}.js`
  if (existsSync(base) && statSync(base).isDirectory() && existsSync(join(base, 'index.d.ts'))) {
    return `${specifier}/index.js`
  }
  return null
}

/**
 * Both forms: `from '…'` in declarations and `import("…")` inside inline types, which vue-tsc
 * emits with double quotes.
 */
const SPECIFIER_RE = /(from\s+|import\(\s*)(['"])(\.[^'"]*)\2/g

let patched = 0
const unresolved = []

for (const file of collect(dist)) {
  const source = readFileSync(file, 'utf8')
  const next = source.replace(SPECIFIER_RE, (match, prefix, quote, specifier) => {
    if (/\.js$/.test(specifier)) return match
    const fixed = withExtension(file, specifier)
    if (!fixed) {
      unresolved.push(`${relative(dist, file)}: ${specifier}`)
      return match
    }
    patched += 1
    return `${prefix}${quote}${fixed}${quote}`
  })
  if (next !== source) writeFileSync(file, next)
}

if (unresolved.length > 0) {
  console.error('Could not append an extension to these specifiers:')
  for (const item of unresolved) console.error(`  ${item}`)
  process.exit(1)
}

console.log(`fix-dts-specifiers: extensions appended: ${patched}`)
