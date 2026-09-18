import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SHoverCard } from '../index'

describe('SHoverCard · browser', () => {
  it('the arrow is stroked with the panel border color and visible without a shadow', async () => {
    render(SHoverCard, {
      props: { open: true, flat: true },
      slots: { trigger: '<a href="#">@alex</a>', default: 'Profile card' },
    })
    await screen.findByText('Profile card')
    const panel = document.querySelector('.s-hover-card__content')!
    const styles = getComputedStyle(panel.querySelector('.s-hover-card__arrow')!)
    expect(styles.stroke).toBe(getComputedStyle(panel).borderTopColor)
    expect(styles.overflow).toBe('visible')
  })
})
