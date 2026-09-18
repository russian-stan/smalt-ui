import { describe, expect, it } from 'vitest'
import { useColorProp } from '../useColorProp'

describe('useColorProp', () => {
  it('returns undefined without color/text-color (no regression)', () => {
    expect(useColorProp({}, 's-button').value).toBeUndefined()
  })

  it('color resolves to var(--s-<name>) plus derived states', () => {
    const s = useColorProp({ color: 'teal' }, 's-button').value!
    expect(s['--s-button-c']).toBe('var(--s-teal)')
    expect(s['--s-button-c-hover']).toContain('color-mix')
    expect(s['--s-button-c-hover']).toContain('var(--s-button-c)')
    expect(s['--s-button-c-subtle']).toContain('transparent')
    expect(s['--s-button-c-on']).toBe('#fff')
  })

  it('family shade (teal-10) and text-color', () => {
    const s = useColorProp({ color: 'teal-10', textColor: 'dark' }, 's-badge').value!
    expect(s['--s-badge-c']).toBe('var(--s-teal-10)')
    expect(s['--s-badge-c-on']).toBe('var(--s-dark)')
  })

  it('text-color only — no accent variables', () => {
    const s = useColorProp({ textColor: 'black' }, 's-button').value!
    expect(s['--s-button-c-on']).toBe('var(--s-black)')
    expect(s['--s-button-c']).toBeUndefined()
  })
})
