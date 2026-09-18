import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SSpinner } from '../index'

describe('SSpinner', () => {
  it('renders with the default size and variant classes, decorative', () => {
    const { container } = render(SSpinner)
    const el = container.querySelector('.s-spinner')
    expect(el).toHaveClass('s-spinner--md', 's-spinner--primary')
    expect(el).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies size and variant', () => {
    const { container } = render(SSpinner, { props: { size: 'lg', variant: 'neutral' } })
    expect(container.querySelector('.s-spinner')).toHaveClass('s-spinner--lg', 's-spinner--neutral')
  })

  it('with a label becomes a status with an accessible name', () => {
    render(SSpinner, { props: { label: 'Loading' } })
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })
})
