import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { SSkeleton } from '../index'

describe('SSkeleton', () => {
  it('renders the animated text variant by default, hidden from screen readers', () => {
    const { container } = render(SSkeleton)
    const el = container.querySelector('.s-skeleton')
    expect(el).toHaveClass('s-skeleton--text', 's-skeleton--animated')
    expect(el).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies the circle variant class', () => {
    const { container } = render(SSkeleton, { props: { variant: 'circle' } })
    expect(container.querySelector('.s-skeleton')).toHaveClass('s-skeleton--circle')
  })

  it('treats numeric sizes as pixels', () => {
    const { container } = render(SSkeleton, { props: { width: 120, height: 40 } })
    const el = container.querySelector('.s-skeleton') as HTMLElement
    expect(el.style.width).toBe('120px')
    expect(el.style.height).toBe('40px')
  })

  it('passes string sizes through as is', () => {
    const { container } = render(SSkeleton, { props: { width: '50%' } })
    expect((container.querySelector('.s-skeleton') as HTMLElement).style.width).toBe('50%')
  })

  it('animated=false removes the animation class', () => {
    const { container } = render(SSkeleton, { props: { animated: false } })
    expect(container.querySelector('.s-skeleton')).not.toHaveClass('s-skeleton--animated')
  })
})
