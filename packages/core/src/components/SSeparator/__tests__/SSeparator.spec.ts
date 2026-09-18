import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SSeparator } from '../index'

describe('SSeparator', () => {
  it('renders a semantic separator by default', () => {
    const { container } = render(SSeparator)
    expect(screen.getByRole('separator')).toBeInTheDocument()
    expect(container.querySelector('.s-separator')).toHaveClass('s-separator--horizontal')
  })

  it('vertical orientation sets the class and aria-orientation', () => {
    const { container } = render(SSeparator, { props: { orientation: 'vertical' } })
    expect(container.querySelector('.s-separator')).toHaveClass('s-separator--vertical')
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('a decorative separator is hidden from screen readers', () => {
    render(SSeparator, { props: { decorative: true } })
    expect(screen.queryByRole('separator')).toBeNull()
  })

  it('renders the label (prop)', () => {
    const { container } = render(SSeparator, { props: { label: 'or' } })
    expect(screen.getByText('or')).toBeInTheDocument()
    expect(container.querySelector('.s-separator--labeled')).toBeInTheDocument()
  })

  it('renders the label from the slot', () => {
    render(SSeparator, { slots: { default: 'OR' } })
    expect(screen.getByText('OR')).toBeInTheDocument()
  })
})
