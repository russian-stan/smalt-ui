import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SProgress } from '../index'

describe('SProgress', () => {
  it('renders a progressbar with the current value', () => {
    render(SProgress, { props: { value: 40, label: 'Loading' } })
    const bar = screen.getByRole('progressbar', { name: 'Loading' })
    expect(bar).toHaveAttribute('aria-valuenow', '40')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('applies the size and variant classes', () => {
    const { container } = render(SProgress, {
      props: { value: 10, size: 'lg', variant: 'positive' },
    })
    expect(container.querySelector('.s-progress')).toHaveClass(
      's-progress--lg',
      's-progress--positive',
    )
  })

  it('takes max into account when computing the fill', () => {
    const { container } = render(SProgress, { props: { value: 5, max: 10 } })
    const indicator = container.querySelector('.s-progress__indicator')
    expect(indicator?.getAttribute('style')).toContain('translateX(-50%)')
  })

  it('without value: indeterminate mode (data-state=indeterminate)', () => {
    render(SProgress, { props: { label: 'Loading' } })
    expect(screen.getByRole('progressbar', { name: 'Loading' })).toHaveAttribute(
      'data-state',
      'indeterminate',
    )
  })
})
