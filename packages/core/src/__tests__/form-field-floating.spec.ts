import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * `SFormField` reads the defaults itself, so `global: { floatingLabel: true }` reaches it even
 * through a component that does not draw a floating label. The field then hides the top label,
 * and the wrapper has none of its own — the field ends up without a label. Every wrapper must
 * pass `floating-label` explicitly: its own value or `false`.
 */
const root = resolve(process.cwd(), 'src/components')

const wrappers = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== 'SFormField')
  .map((entry) => ({
    name: entry.name,
    source: readFileSync(`${root}/${entry.name}/${entry.name}.vue`, 'utf8'),
  }))
  .filter(({ source }) => source.includes('<SFormField'))

describe('SFormField wrappers', () => {
  it('finds the wrappers', () => {
    expect(wrappers.length).toBeGreaterThan(10)
  })

  for (const { name, source } of wrappers) {
    it(`${name} passes floating-label explicitly`, () => {
      const tag = source.match(/<SFormField\b[^>]*>/)?.[0] ?? ''
      expect(tag).toMatch(/:floating-label=/)
    })
  }
})
