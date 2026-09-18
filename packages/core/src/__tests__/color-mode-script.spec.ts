import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { colorModeScript } from '../color-mode-script'

/**
 * The script runs in `<head>` before the first paint, so the test checks the result rather than
 * the text: it runs the script through `eval` and reads the attribute left on `<html>`.
 */
function run(script: string, systemPrefersDark: boolean): string | null {
  window.matchMedia = ((query: string) => ({
    matches: systemPrefersDark && query.includes('dark'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia
  eval(script)
  return document.documentElement.getAttribute('data-theme')
}

describe('colorModeScript', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('a saved choice wins over the system theme — the reason the script exists', () => {
    localStorage.setItem('smalt-color-mode', 'light')
    expect(run(colorModeScript(), true)).toBe('light')
  })

  it('without a saved choice the system theme is used', () => {
    expect(run(colorModeScript(), true)).toBe('dark')
    document.documentElement.removeAttribute('data-theme')
    expect(run(colorModeScript(), false)).toBe('light')
  })

  it('storageKey and initialMode match the useColorMode options', () => {
    localStorage.setItem('own-key', 'dark')
    expect(run(colorModeScript({ storageKey: 'own-key' }), false)).toBe('dark')

    document.documentElement.removeAttribute('data-theme')
    expect(run(colorModeScript({ initialMode: 'dark' }), false)).toBe('dark')
  })

  it('an unavailable localStorage does not break the page', () => {
    const original = Object.getOwnPropertyDescriptor(window, 'localStorage')
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('storage access denied')
      },
    })
    expect(() => run(colorModeScript(), false)).not.toThrow()
    if (original) Object.defineProperty(window, 'localStorage', original)
  })

  it('a closing tag cannot escape the inline script', () => {
    expect(colorModeScript({ storageKey: '</script><script>alert(1)' })).not.toContain('</script>')
  })
})
