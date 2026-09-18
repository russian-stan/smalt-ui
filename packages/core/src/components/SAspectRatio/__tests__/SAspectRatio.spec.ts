import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SAspectRatio } from '../index'

describe('SAspectRatio', () => {
  it('renders slot content', () => {
    render(SAspectRatio, { slots: { default: 'Content' } })
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('passes the aspect ratio to the wrapper style', () => {
    const { container } = render(SAspectRatio, {
      props: { ratio: 16 / 9 },
      slots: { default: 'X' },
    })
    const wrapper = container.querySelector('.s-aspect-ratio')?.parentElement
    expect(wrapper?.getAttribute('style')).toContain('padding-bottom')
  })

  it('defaults to a 1:1 ratio', () => {
    const { container } = render(SAspectRatio, { slots: { default: 'X' } })
    const wrapper = container.querySelector('.s-aspect-ratio')?.parentElement
    expect(wrapper?.getAttribute('style')).toContain('100%')
  })
})
