import { afterEach, describe, expect, it } from 'vitest'
import { createTheme, injectTheme } from '../createTheme'

describe('createTheme', () => {
  it('uses :root:root:root by default (specificity (0,3,0) > the dark theme)', () => {
    const css = createTheme({ 'color-primary': '#7c3aed' })
    expect(css).toContain(':root:root:root {')
    expect(css).toContain('--s-color-primary: #7c3aed;')
  })

  it('supports a custom selector', () => {
    const css = createTheme({ 'radius-md': '1rem' }, { selector: '.brand' })
    expect(css.startsWith('.brand {')).toBe(true)
    expect(css).toContain('--s-radius-md: 1rem;')
  })

  it('a token value cannot close the block and append its own rules', () => {
    const css = createTheme({ primary: 'red; } body { display: none' })
    expect(css).not.toContain('body {')
    expect(css).toContain('--s-primary: red')
  })
})

describe('injectTheme', () => {
  afterEach(() => {
    document.querySelectorAll('style[data-smalt-theme]').forEach((el) => el.remove())
    document.getElementById('app')?.remove()
  })

  it('leaves a host page element with the same name alone', () => {
    const mount = document.createElement('div')
    mount.id = 'app'
    mount.textContent = 'application'
    document.body.appendChild(mount)

    // A preset name arrives here as the theme id and may well match a host element id.
    injectTheme(createTheme({ primary: 'red' }), 'app')

    expect(mount.textContent).toBe('application')
    expect(document.querySelector('style[data-smalt-theme="app"]')?.textContent).toContain('red')
  })

  it('inserts and updates one <style> per theme', () => {
    const find = () => document.querySelector('style[data-smalt-theme="test-theme"]')

    injectTheme(createTheme({ 'color-primary': 'red' }), 'test-theme')
    expect(find()?.tagName).toBe('STYLE')
    expect(find()?.textContent).toContain('red')

    injectTheme(createTheme({ 'color-primary': 'blue' }), 'test-theme')
    expect(document.querySelectorAll('style[data-smalt-theme="test-theme"]')).toHaveLength(1)
    expect(find()?.textContent).toContain('blue')
  })
})
