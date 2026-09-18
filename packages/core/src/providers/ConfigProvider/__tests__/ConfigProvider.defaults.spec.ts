/* eslint-disable vue/one-component-per-file -- test wrapper hosts for the provider */
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { defineComponent, h } from 'vue'
import { ConfigProvider } from '../index'
import { SButton } from '../../../components/SButton'
import { SAlert } from '../../../components/SAlert'
import { provideDefaults, provideLocale } from '../../../composables'

describe('ConfigProvider · prop defaults', () => {
  it('provides a component default to the subtree', () => {
    render(ConfigProvider, {
      props: { defaults: { SButton: { size: 'lg' } } },
      slots: { default: () => h(SButton, null, { default: () => 'Button' }) },
    })
    expect(screen.getByRole('button')).toHaveClass('s-button--lg')
  })

  it('an explicit prop beats the default', () => {
    render(ConfigProvider, {
      props: { defaults: { SButton: { size: 'lg' } } },
      slots: { default: () => h(SButton, { size: 'sm' }, { default: () => 'Button' }) },
    })
    expect(screen.getByRole('button')).toHaveClass('s-button--sm')
  })

  it('a provider without its own defaults keeps the app defaults', () => {
    const App = defineComponent({
      setup() {
        provideDefaults(() => ({ SButton: { size: 'lg', variant: 'outline' } }))
        return () =>
          h(ConfigProvider, { locale: 'en' }, { default: () => h(SButton, null, () => 'Button') })
      },
    })
    render(App)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('s-button--lg')
    expect(button).toHaveClass('s-button--outline')
  })

  it('a nested provider extends the parent defaults instead of replacing them', () => {
    const App = defineComponent({
      setup() {
        provideDefaults(() => ({ global: { size: 'lg' }, SButton: { variant: 'outline' } }))
        return () =>
          h(
            ConfigProvider,
            { defaults: { SButton: { round: true } } },
            { default: () => h(SButton, null, () => 'Button') },
          )
      },
    })
    render(App)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('s-button--lg')
    expect(button).toHaveClass('s-button--outline')
    expect(button).toHaveClass('s-button--round')
  })

  it('a provider without locale keeps the app locale', () => {
    const App = defineComponent({
      setup() {
        provideLocale(() => ({ locale: 'en' }))
        return () =>
          h(
            ConfigProvider,
            { defaults: { SAlert: { closable: true } } },
            { default: () => h(SAlert, null, () => 'Text') },
          )
      },
    })
    render(App)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close')
  })
})
