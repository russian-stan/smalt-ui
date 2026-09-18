import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { ConfigProvider } from '../index'
import { SAlert } from '../../../components/SAlert'

describe('ConfigProvider', () => {
  it('provides the English locale to nested components', () => {
    render({
      components: { ConfigProvider, SAlert },
      template: `
        <ConfigProvider locale="en">
          <SAlert title="Note" closable />
        </ConfigProvider>
      `,
    })
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('partially overrides strings on top of the base locale', () => {
    render({
      components: { ConfigProvider, SAlert },
      template: `
        <ConfigProvider :messages="{ close: 'Schließen' }">
          <SAlert title="Hinweis" closable />
        </ConfigProvider>
      `,
    })
    expect(screen.getByRole('button', { name: 'Schließen' })).toBeInTheDocument()
  })

  it('without a provider returns the English dictionary by default', () => {
    render(SAlert, { props: { title: 'Note', closable: true } })
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('a component prop overrides the dictionary', () => {
    render({
      components: { ConfigProvider, SAlert },
      template: `
        <ConfigProvider locale="en">
          <SAlert title="Note" closable close-label="Dismiss" />
        </ConfigProvider>
      `,
    })
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument()
  })
})
