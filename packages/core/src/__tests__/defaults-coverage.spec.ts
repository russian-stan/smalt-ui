import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * A component with its own props must pass them through useDefaults, otherwise the global
 * configuration silently does not apply to it. The test checks the useDefaults call, the
 * component name in it (a typo detaches `defaults: { SButton: … }`) and the absence of raw
 * `props` access in the script and template: such access bypasses the defaults.
 */
const root = resolve(process.cwd(), 'src')

/** Public components and providers: both are registered as components. */
const targets = ['components', 'providers'].flatMap((group) =>
  readdirSync(`${root}/${group}`, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      name: entry.name,
      label: `${group}/${entry.name}`,
      path: `${root}/${group}/${entry.name}/${entry.name}.vue`,
    })),
)

/** `props` may appear only in the declaration and when passed to useDefaults. */
const RAW_PROPS_ACCESS = /\bprops\.\w+/g

describe('useDefaults coverage', () => {
  it('finds components and providers', () => {
    expect(targets.length).toBeGreaterThan(50)
  })

  for (const { name, label, path } of targets) {
    it(`${label} reads the defaults`, () => {
      const source = readFileSync(path, 'utf8')
      // ConfigProvider provides the defaults and does not consume them.
      if (!source.includes('defineProps') || name === 'ConfigProvider') return

      expect(source, `${label} must call useDefaults`).toContain('useDefaults(')

      const registered = source.match(/useDefaults\(\s*props\s*,\s*['"]([^'"]+)['"]/)?.[1]
      expect(registered, `${label}: the name in useDefaults must match the component name`).toBe(
        name,
      )

      const accesses = source.match(RAW_PROPS_ACCESS) ?? []
      expect(accesses, `${label}: raw props access bypasses the defaults`).toEqual([])
    })
  }
})
