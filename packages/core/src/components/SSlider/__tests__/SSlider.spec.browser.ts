import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { render } from '@testing-library/vue'
import { SSlider } from '../index'

/**
 * Geometry and computed styles: happy-dom does not compute them, so the track and thumb sizes
 * and the cursors are checked only here.
 */
describe('SSlider · browser', () => {
  it('4px track, 16px thumb', async () => {
    const { container } = render(SSlider, { props: { modelValue: 50, label: 'Volume' } })
    const track = container.querySelector('.s-slider__track')!.getBoundingClientRect()
    expect(Math.round(track.height)).toBe(4)

    /**
     * Reka measures the track via ResizeObserver and keeps the thumb zero-sized until the
     * first measurement; happy-dom has no such phase, in the browser it has to be awaited.
     */
    await vi.waitFor(() => {
      const thumb = container.querySelector('.s-slider__thumb')!.getBoundingClientRect()
      expect(Math.round(thumb.width)).toBe(16)
      expect(Math.round(thumb.height)).toBe(16)
    })
  })

  it('grab cursor on the control and the thumb', () => {
    const { container } = render(SSlider, { props: { modelValue: 50, label: 'Volume' } })
    const control = container.querySelector<HTMLElement>('.s-slider__control')!
    const thumb = container.querySelector<HTMLElement>('.s-slider__thumb')!
    expect(getComputedStyle(control).cursor).toBe('grab')
    expect(getComputedStyle(thumb).cursor).toBe('grab')
  })

  it('disabled sets not-allowed', () => {
    const { container } = render(SSlider, {
      props: { modelValue: 50, label: 'Volume', disabled: true },
    })
    const control = container.querySelector<HTMLElement>('.s-slider__control')!
    expect(getComputedStyle(control).cursor).toBe('not-allowed')
  })

  it('the value bubble is hidden at rest and shows on focus', async () => {
    const { container } = render(SSlider, {
      props: { modelValue: 50, label: 'Volume', showValue: true },
    })
    const control = container.querySelector<HTMLElement>('.s-slider__control')!
    const bubble = container.querySelector('.s-slider__value')!
    expect(bubble.classList.contains('s-slider__value--visible')).toBe(false)
    control.dispatchEvent(new Event('focusin'))
    await nextTick()
    expect(bubble.classList.contains('s-slider__value--visible')).toBe(true)
    expect(getComputedStyle(bubble).opacity).toBe('1')
  })

  it('the bubble uses the fill contrast color instead of inheriting the text color', () => {
    const { container } = render(SSlider, {
      props: { modelValue: 50, label: 'Volume', showValue: true },
    })
    const bubble = container.querySelector('.s-slider__value')!
    expect(getComputedStyle(bubble).color).toBe('rgb(255, 255, 255)')
  })

  it('valueAlways keeps the bubble off the label without enlarging the click area', async () => {
    const { container } = render(SSlider, {
      props: { modelValue: 40, label: 'Volume', showValue: true, valueAlways: true },
    })
    const label = container.querySelector('.s-field__label')!.getBoundingClientRect()
    const control = container.querySelector('.s-slider__control')!.getBoundingClientRect()

    // The bubble hangs on the thumb, which is placed only after the track is measured (see above).
    await vi.waitFor(() => {
      const bubble = container.querySelector('.s-slider__value')!.getBoundingClientRect()
      expect(bubble.height).toBeGreaterThan(0)
      expect(bubble.top).toBeGreaterThanOrEqual(label.bottom)
    })

    /**
     * Reka binds pointerdown (which sets the value by X) to the whole control, so the reserved
     * space must lie outside its box: otherwise a click on empty space above the track moves
     * the thumb.
     */
    expect(Math.round(control.height)).toBe(20)
  })
})
