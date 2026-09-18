import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SBadge } from '../index'

describe('SBadge', () => {
  it('renders the content', () => {
    render(SBadge, { slots: { default: 'New' } })
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies the variant and size classes', () => {
    const { container } = render(SBadge, {
      props: { variant: 'positive', size: 'sm' },
      slots: { default: 'OK' },
    })
    const badge = container.querySelector('.s-badge')
    expect(badge).toHaveClass('s-badge--positive', 's-badge--sm')
  })

  it('supports the lg size (the comfortable preset sets it globally)', () => {
    const { container } = render(SBadge, {
      props: { size: 'lg' },
      slots: { default: () => 'Label' },
    })
    const badge = container.querySelector('.s-badge')!
    expect(badge).toHaveClass('s-badge--lg')
    // The size must set its own height, otherwise the badge collapses onto the text.
    expect(getComputedStyle(badge).height).not.toBe('')
  })

  it('renders the leading and trailing icons', () => {
    const { container } = render(SBadge, {
      props: { icon: 'star', iconRight: 'x' },
      slots: { default: 'Tag' },
    })
    expect(container.querySelectorAll('.s-badge .s-icon')).toHaveLength(2)
  })
})
