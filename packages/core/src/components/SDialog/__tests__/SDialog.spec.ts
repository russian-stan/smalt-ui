import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SDialog } from '../index'

describe('SDialog', () => {
  it('does not render content while closed', () => {
    render(SDialog, { props: { title: 'Title' } })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders the title, description and body when open', async () => {
    render(SDialog, {
      props: { open: true, title: 'Delete?', description: 'This cannot be undone' },
      slots: { default: 'Dialog body' },
    })
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Delete?')).toBeInTheDocument()
    expect(screen.getByText('This cannot be undone')).toBeInTheDocument()
    expect(screen.getByText('Dialog body')).toBeInTheDocument()
  })

  it('the dialog is linked to the title via aria-labelledby', async () => {
    render(SDialog, { props: { open: true, title: 'Title' } })
    expect(await screen.findByRole('dialog')).toHaveAttribute('aria-labelledby')
  })

  it('contains a close button with an accessible name', async () => {
    render(SDialog, { props: { open: true, title: 'Title' } })
    expect(await screen.findByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('width sets the window width via a variable, a number in pixels', async () => {
    render(SDialog, { props: { open: true, title: 'Map', width: 960 } })
    const dialog = await screen.findByRole('dialog')
    expect(dialog.style.getPropertyValue('--s-dialog-width')).toBe('960px')
  })

  it('class and attributes from the component land on the window', async () => {
    render(SDialog, {
      props: { open: true, title: 'Map' },
      attrs: { class: 'map-dialog', 'data-test': 'chooser' },
    })
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveClass('s-dialog__content', 'map-dialog')
    expect(dialog).toHaveAttribute('data-test', 'chooser')
  })
})
