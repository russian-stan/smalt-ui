import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SLabel } from '../index'

describe('SLabel', () => {
  it('renders the text and links via for', () => {
    render(SLabel, { props: { for: 'field-1' }, slots: { default: 'Name' } })
    const label = screen.getByText('Name')
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveAttribute('for', 'field-1')
  })

  it('shows the required marker with required', () => {
    render(SLabel, { props: { required: true }, slots: { default: 'Email' } })
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('hides the marker without required', () => {
    render(SLabel, { slots: { default: 'Email' } })
    expect(screen.queryByText('*')).toBeNull()
  })

  it('applies the size modifier', () => {
    const { container } = render(SLabel, { props: { size: 'lg' }, slots: { default: 'X' } })
    expect(container.querySelector('.s-label--lg')).not.toBeNull()
  })
})
