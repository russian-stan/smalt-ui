import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SVisuallyHidden } from '../index'

describe('SVisuallyHidden', () => {
  it('renders content available to screen readers', () => {
    render(SVisuallyHidden, { slots: { default: 'Hidden text' } })
    expect(screen.getByText('Hidden text')).toBeInTheDocument()
  })

  it('renders a <span> with the s-visually-hidden class by default', () => {
    const { container } = render(SVisuallyHidden, { slots: { default: 'x' } })
    expect(container.querySelector('span.s-visually-hidden')).not.toBeNull()
  })

  it('renders the tag given by the as prop', () => {
    const { container } = render(SVisuallyHidden, {
      props: { as: 'div' },
      slots: { default: 'x' },
    })
    expect(container.querySelector('div.s-visually-hidden')).not.toBeNull()
  })
})
