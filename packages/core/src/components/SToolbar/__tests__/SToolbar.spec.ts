import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SToolbar } from '../index'

describe('SToolbar', () => {
  it('renders the slot content with the toolbar role', () => {
    render(SToolbar, { slots: { default: '<button type="button">Action</button>' } })
    const toolbar = screen.getByRole('toolbar')
    expect(toolbar).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })

  it('is horizontal by default', () => {
    render(SToolbar, { slots: { default: 'X' } })
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('passes the orientation', () => {
    const { container } = render(SToolbar, {
      props: { orientation: 'vertical' },
      slots: { default: 'X' },
    })
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'vertical')
    expect(container.querySelector('.s-toolbar')).toHaveClass('s-toolbar--vertical')
  })

  it('passes the accessible name', () => {
    render(SToolbar, { props: { ariaLabel: 'Formatting' }, slots: { default: 'X' } })
    expect(screen.getByRole('toolbar', { name: 'Formatting' })).toBeInTheDocument()
  })
})
