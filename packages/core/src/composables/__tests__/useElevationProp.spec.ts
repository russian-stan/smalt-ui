import { describe, expect, it } from 'vitest'
import { reactive } from 'vue'
import { useElevationProp } from '../useElevationProp'

describe('useElevationProp', () => {
  it('returns undefined without props — the component keeps its own shadow', () => {
    expect(useElevationProp({}, 's-card').value).toBeUndefined()
  })

  it('flat removes the shadow', () => {
    expect(useElevationProp({ flat: true }, 's-card').value).toEqual({
      '--s-card-elevation': 'none',
    })
  })

  it('elevation resolves to a level token, not a literal value', () => {
    expect(useElevationProp({ elevation: 3 }, 's-surface').value).toEqual({
      '--s-surface-elevation': 'var(--s-elevation-3)',
    })
  })

  it('elevation overrides flat: the specific setting beats the global switch', () => {
    const s = useElevationProp({ flat: true, elevation: 2 }, 's-card').value!
    expect(s['--s-card-elevation']).toBe('var(--s-elevation-2)')
  })

  it('elevation: 0 is as flat as flat', () => {
    expect(useElevationProp({ elevation: 0 }, 's-card').value).toEqual({
      '--s-card-elevation': 'none',
    })
  })

  it('a static attribute arrives as a string and is normalized', () => {
    const s = useElevationProp({ elevation: '2' as unknown as 2 }, 's-card').value!
    expect(s['--s-card-elevation']).toBe('var(--s-elevation-2)')
  })

  it('hover raises the shadow one level', () => {
    expect(useElevationProp({ elevation: 1 }, 's-button', { hover: true }).value).toEqual({
      '--s-button-elevation': 'var(--s-elevation-1)',
      '--s-button-elevation-hover': 'var(--s-elevation-2)',
    })
  })

  it('hover does not rise from zero or go past the top of the scale', () => {
    const flat = useElevationProp({ flat: true }, 's-button', { hover: true }).value!
    expect(flat['--s-button-elevation-hover']).toBe('none')

    const top = useElevationProp({ elevation: 5 }, 's-button', { hover: true }).value!
    expect(top['--s-button-elevation-hover']).toBe('var(--s-elevation-5)')
  })

  it('zero replaces none: a shadow in a list cannot be removed with the keyword', () => {
    const s = useElevationProp({ flat: true }, 's-card', { zero: '0 0 #0000' }).value!
    expect(s['--s-card-elevation']).toBe('0 0 #0000')
  })

  it('recomputes when props change', () => {
    const props = reactive<{ flat?: boolean; elevation?: 0 | 1 | 2 | 3 | 4 | 5 }>({ flat: true })
    const style = useElevationProp(props, 's-card')
    expect(style.value!['--s-card-elevation']).toBe('none')
    props.elevation = 4
    expect(style.value!['--s-card-elevation']).toBe('var(--s-elevation-4)')
  })
})
