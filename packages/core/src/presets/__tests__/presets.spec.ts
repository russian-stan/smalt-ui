/* eslint-disable vue/one-component-per-file -- test hosts for mounting a button */
import { describe, expect, it } from 'vitest'
import { createApp, h } from 'vue'
import { BUILTIN_PRESETS, compact, definePreset } from '../index'
import { createSUI } from '../../plugin'
import { SButton } from '../../components/SButton'

describe('presets', () => {
  it('definePreset returns the object as is (typing helper)', () => {
    const preset = definePreset({ name: 'test', defaults: { global: { size: 'sm' } } })
    expect(preset).toEqual({ name: 'test', defaults: { global: { size: 'sm' } } })
  })

  it('the built-in compact preset sets compact sizes', () => {
    expect(compact.defaults?.global?.size).toBe('sm')
  })

  it('the built-in preset registry contains all named presets', () => {
    expect(Object.keys(BUILTIN_PRESETS).sort()).toEqual(['comfortable', 'compact'])
  })

  it('the plugin applies the preset defaults', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const app = createApp({ render: () => h(SButton, null, { default: () => 'Button' }) })
    app.use(createSUI({ preset: compact }))
    app.mount(root)
    expect(root.querySelector('button')).toHaveClass('s-button--sm')
    app.unmount()
    root.remove()
  })

  it('explicit defaults extend the preset section instead of replacing it', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const app = createApp({ render: () => h(SButton, null, { default: () => 'Button' }) })
    // The preset global has size: sm; the own round key must not erase the size.
    app.use(createSUI({ preset: compact, defaults: { global: { round: true } } }))
    app.mount(root)
    const button = root.querySelector('button')
    expect(button).toHaveClass('s-button--sm')
    expect(button).toHaveClass('s-button--round')
    app.unmount()
    root.remove()
  })

  it('explicit defaults apply on top of the preset', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const app = createApp({ render: () => h(SButton, null, { default: () => 'Button' }) })
    app.use(createSUI({ preset: compact, defaults: { global: { size: 'lg' } } }))
    app.mount(root)
    expect(root.querySelector('button')).toHaveClass('s-button--lg')
    app.unmount()
    root.remove()
  })
})
