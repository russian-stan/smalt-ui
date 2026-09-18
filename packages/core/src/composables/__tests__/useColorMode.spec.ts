import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

describe('useColorMode', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to auto mode and applies the scheme to data-theme', async () => {
    const { useColorMode } = await freshModule()
    const { mode, scheme } = useColorMode()
    expect(mode.value).toBe('auto')
    expect(['light', 'dark']).toContain(scheme.value)
    expect(document.documentElement.getAttribute('data-theme')).toBe(scheme.value)
  })

  it('setMode("dark") sets data-theme=dark and saves it to localStorage', async () => {
    const { useColorMode } = await freshModule()
    const cm = useColorMode()
    cm.setMode('dark')
    await nextTick()
    expect(cm.scheme.value).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('smalt-color-mode')).toBe('dark')
  })

  it('toggle switches between light and dark', async () => {
    const { useColorMode } = await freshModule()
    const cm = useColorMode()
    cm.setMode('light')
    await nextTick()
    cm.toggle()
    await nextTick()
    expect(cm.scheme.value).toBe('dark')
    cm.toggle()
    await nextTick()
    expect(cm.scheme.value).toBe('light')
  })

  it('reads the saved mode from localStorage on init', async () => {
    localStorage.setItem('smalt-color-mode', 'dark')
    const { useColorMode } = await freshModule()
    const cm = useColorMode()
    expect(cm.mode.value).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})

/** Reimports the module to reset the singleton between tests. */
function freshModule() {
  vi.resetModules()
  return import('../useColorMode')
}
