import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SAvatar } from '../index'

describe('SAvatar', () => {
  it('shows fallback initials without an image', () => {
    render(SAvatar, { props: { fallback: 'AB' } })
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('marks the image as decorative without alt', () => {
    const { container } = render(SAvatar, { props: { src: 'https://example.com/a.png' } })
    expect(container.querySelector('img')?.getAttribute('alt')).toBe('')
  })

  it('applies the size class', () => {
    const { container } = render(SAvatar, { props: { fallback: 'X', size: 'lg' } })
    expect(container.querySelector('.s-avatar')).toHaveClass('s-avatar--lg')
  })

  it('renders the fallback from the slot', () => {
    render(SAvatar, { slots: { default: 'JD' } })
    expect(screen.getByText('JD')).toBeInTheDocument()
  })
})
