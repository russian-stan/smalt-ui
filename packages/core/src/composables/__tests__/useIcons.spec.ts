import { describe, expect, it } from 'vitest'
import { registerIcons, resolveIcon, useIcons, type SIconNode } from '../useIcons'

describe('useIcons', () => {
  it('resolves a built-in icon', () => {
    expect(resolveIcon('chevron-down')).toEqual([['path', { d: 'm6 9 6 6 6-6' }]])
  })

  it('unknown name → undefined', () => {
    expect(resolveIcon('totally-unknown')).toBeUndefined()
  })

  it('registerIcons adds a new icon', () => {
    const rocket: SIconNode = [['path', { d: 'M1 2 3 4' }]]
    registerIcons({ rocket })
    expect(resolveIcon('rocket')).toBe(rocket)
  })

  it('registerIcons overwrites an existing name', () => {
    const custom: SIconNode = [['path', { d: 'M9 9' }]]
    registerIcons({ 'chevron-down': custom })
    expect(resolveIcon('chevron-down')).toBe(custom)
    // The registry is a module singleton: otherwise the override would leak into other tests.
    registerIcons({ 'chevron-down': [['path', { d: 'm6 9 6 6 6-6' }]] })
  })

  it('useIcons() returns the same functions', () => {
    const api = useIcons()
    expect(api.registerIcons).toBe(registerIcons)
    expect(api.resolveIcon).toBe(resolveIcon)
  })
})
