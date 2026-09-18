import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { h } from 'vue'
import { SSeparator } from '../index'

/** Computed geometry: happy-dom does not compute the height of a stretched element. */
describe('SSeparator · browser', () => {
  /**
   * A vertical separator gets its height from stretching along the row, not from a percentage of
   * the parent: a button bar usually has auto height, and `height: 100%` would collapse the line.
   */
  it('stretches to the row height when the parent has none', () => {
    const { container } = render({
      render: () =>
        h('div', { style: 'display: flex; align-items: center; gap: 12px' }, [
          h('span', { style: 'line-height: 2rem' }, 'Profile'),
          h(SSeparator, { orientation: 'vertical' }),
          h('span', 'Log out'),
        ]),
    })

    const line = container.querySelector('.s-separator')!.getBoundingClientRect()
    expect(line.height).toBeGreaterThanOrEqual(32)
    expect(line.width).toBeCloseTo(1, 1)
  })
})
