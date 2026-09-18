import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { userEvent } from 'vitest/browser'
import { STooltip } from '../index'

/**
 * `auto` mode reads the live event's `pointerType`, and the bubble is portaled to body; happy-dom
 * reproduces neither: there a PointerEvent arrives without a pointer type.
 */
describe('STooltip · browser', () => {
  const mount = (props: Record<string, unknown> = {}) => {
    render(STooltip, {
      props: { content: 'Tooltip', delayDuration: 0, ...props },
      slots: { trigger: '<button>Trigger</button>' },
    })
    return screen.getByRole('button', { name: 'Trigger' })
  }

  /** `userEvent` has no touch input, so the tap sequence is dispatched by hand. */
  const tap = async (el: Element) => {
    el.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'touch', bubbles: true }))
    el.dispatchEvent(new PointerEvent('pointerup', { pointerType: 'touch', bubbles: true }))
    ;(el as HTMLElement).click()
  }

  const content = () => document.querySelector('.s-tooltip__content')

  it('auto: a tap opens the tooltip and a second tap closes it', async () => {
    const trigger = mount({ trigger: 'auto' })

    await tap(trigger)
    await expect.poll(() => content()?.textContent).toContain('Tooltip')

    await tap(trigger)
    await expect.poll(content).toBeNull()
  })

  it('auto: a tooltip opened by a tap closes on a press outside', async () => {
    const trigger = mount({ trigger: 'auto' })

    await tap(trigger)
    await expect.poll(() => content()?.textContent).toContain('Tooltip')

    await userEvent.click(document.body)
    await expect.poll(content).toBeNull()
  })

  it('auto: a mouse opens the tooltip on hover', async () => {
    const trigger = mount({ trigger: 'auto' })

    await userEvent.hover(trigger)
    await expect.poll(() => content()?.textContent).toContain('Tooltip')
  })

  it('click: hover does not open the tooltip', async () => {
    const trigger = mount({ trigger: 'click' })

    await userEvent.hover(trigger)
    await expect.poll(content).toBeNull()

    await userEvent.click(trigger)
    await expect.poll(() => content()?.textContent).toContain('Tooltip')
  })
})
