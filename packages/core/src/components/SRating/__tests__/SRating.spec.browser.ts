import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { userEvent } from 'vitest/browser'
import { SRating } from '../index'

/**
 * happy-dom provides no real focus, geometry or styles: unit tests pass there even if the
 * component renders no `role="radio"` at all.
 */
describe('SRating · browser', () => {
  it('clicking an item sets the rating', async () => {
    const { container, emitted } = render(SRating, {
      props: { modelValue: 0, length: 5, ariaLabel: 'Rating' },
    })
    const radios = container.querySelectorAll<HTMLElement>('[role="radio"]')
    expect(radios).toHaveLength(5)
    await userEvent.click(radios[3])
    expect(emitted('update:modelValue')?.at(-1)).toEqual([4])
  })

  it('the hit area actually covers the star', () => {
    const { container } = render(SRating, {
      props: { modelValue: 0, length: 5, ariaLabel: 'Rating' },
    })
    const glyph = container.querySelector('.s-rating__glyphs')!.getBoundingClientRect()
    const step = container.querySelector('.s-rating__step')!.getBoundingClientRect()
    expect(step.width).toBeGreaterThan(0)
    expect(step.height).toBeGreaterThan(0)
    expect(Math.abs(step.left - glyph.left)).toBeLessThan(2)
  })

  it('an arrow key moves focus between items', async () => {
    const { container } = render(SRating, {
      props: { modelValue: 2, length: 5, ariaLabel: 'Rating' },
    })
    const radios = container.querySelectorAll<HTMLElement>('[role="radio"]')
    radios[1].focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(radios[2])
  })

  it('readonly prevents changing the rating and does not dim the control', async () => {
    const { container, emitted } = render(SRating, {
      props: { modelValue: 3, length: 5, readonly: true, ariaLabel: 'Rating' },
    })
    const root = container.querySelector<HTMLElement>('.s-rating')!
    expect(getComputedStyle(root).opacity).toBe('1')
    await userEvent.click(container.querySelectorAll<HTMLElement>('[role="radio"]')[4], {
      force: true,
    })
    expect(emitted('update:modelValue')).toBeUndefined()
  })

  it('size sets the actual item size', () => {
    const { container } = render(SRating, {
      props: { modelValue: 3, length: 5, size: 40, ariaLabel: 'Rating' },
    })
    const box = container.querySelector('.s-rating__glyphs')!.getBoundingClientRect()
    expect(Math.round(box.width)).toBe(40)
    expect(Math.round(box.height)).toBe(40)
  })
})
