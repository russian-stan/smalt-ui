import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { h, ref } from 'vue'
import { SStepper } from '../index'
import type { SStepperItem, SStepperLabelPlacement, SStepperOrientation } from '../index'

// Descriptions of different lengths wrap differently, so the steps get different heights.
const items: SStepperItem[] = [
  { title: 'Delivery', description: 'Address and method' },
  { title: 'Payment', description: 'Card, invoice or installments over several payments' },
  { title: 'Confirmation' },
]

const box = (el: Element) => el.getBoundingClientRect()
const centerX = (el: Element) => box(el).left + box(el).width / 2
const centerY = (el: Element) => box(el).top + box(el).height / 2

function stepper(
  orientation: SStepperOrientation,
  labelPlacement: SStepperLabelPlacement,
  containerWidth = '1200px',
) {
  const { container } = render(SStepper, {
    props: { items, modelValue: 1, orientation, labelPlacement },
  })
  ;(container as HTMLElement).style.inlineSize = containerWidth
  const root = container.querySelector('.s-stepper')!
  return {
    root,
    items: [...root.querySelectorAll('.s-stepper__item')],
    triggers: [...root.querySelectorAll('.s-stepper__trigger')],
    indicators: [...root.querySelectorAll('.s-stepper__indicator')],
    separators: [...root.querySelectorAll('.s-stepper__separator')],
    first: {
      title: root.querySelector('.s-stepper__title')!,
      description: root.querySelector('.s-stepper__description')!,
      indicator: root.querySelector('.s-stepper__indicator')!,
    },
  }
}

/** Layout and computed geometry: happy-dom computes neither. */
describe('SStepper · browser', () => {
  const sides = {
    top: (title: DOMRect, dot: DOMRect) => title.bottom <= dot.top,
    bottom: (title: DOMRect, dot: DOMRect) => title.top >= dot.bottom,
    start: (title: DOMRect, dot: DOMRect) => title.right <= dot.left,
    end: (title: DOMRect, dot: DOMRect) => title.left >= dot.right,
  } satisfies Record<SStepperLabelPlacement, (title: DOMRect, dot: DOMRect) => boolean>

  const cases = (['horizontal', 'vertical'] as const).flatMap((orientation) =>
    (Object.keys(sides) as SStepperLabelPlacement[]).map(
      (placement) => [orientation, placement] as const,
    ),
  )

  it.each(cases)('%s: places the label on the %s side', (orientation, placement) => {
    const { first } = stepper(orientation, placement)
    expect(sides[placement](box(first.title), box(first.indicator))).toBe(true)
  })

  /**
   * The connector runs through the circles, not the labels: it is tied to one edge of the step,
   * while label heights differ between steps. The axis depends on the orientation — in vertical
   * the line sits under the circle, in horizontal it passes through their centers.
   */
  it.each(['end', 'start', 'top', 'bottom'] as const)(
    'vertical: runs the connector under the circles with label %s',
    (placement) => {
      const { indicators, separators } = stepper('vertical', placement)
      const line = centerX(separators[0])

      for (const dot of indicators) expect(Math.abs(centerX(dot) - line)).toBeLessThan(1)
    },
  )

  it.each(['bottom', 'top'] as const)(
    'horizontal: runs the connector through the circle centers with label %s',
    (placement) => {
      const { indicators, separators } = stepper('horizontal', placement)
      const line = centerY(separators[0])

      for (const dot of indicators) expect(Math.abs(centerY(dot) - line)).toBeLessThan(1)
    },
  )

  /**
   * A side label turns the step into a row, and the row would shrink to its content, leaving
   * empty space on the right. The connectors take the free width, so the last step reaches
   * the edge.
   */
  it.each(['start', 'end'] as const)(
    'horizontal: stretches the row to full width with label %s',
    (placement) => {
      const { root, items: steps } = stepper('horizontal', placement)
      const last = steps[steps.length - 1]

      expect(Math.abs(box(root).right - box(last).right)).toBeLessThan(1)
    },
  )

  /**
   * A title and description of different lengths are centered relative to each other instead
   * of hugging the circle: otherwise the label edge would shift from step to step.
   */
  it.each(['start', 'end'] as const)(
    'horizontal: centers the label with placement %s',
    (placement) => {
      const { first } = stepper('horizontal', placement)
      expect(Math.abs(centerX(first.title) - centerX(first.description))).toBeLessThan(1)
    },
  )

  /**
   * The threshold is compared with the stepper width, not the window: the container here is
   * narrow in a wide viewport — exactly the case of a sidebar or a modal where a media query
   * stays silent.
   */
  describe('collapsing by container width', () => {
    function render_(containerWidth: string) {
      const { container } = render(SStepper, {
        props: { items, modelValue: 1, stackAt: 600 },
      })
      ;(container as HTMLElement).style.inlineSize = containerWidth
      return container.querySelector('.s-stepper')!
    }

    it('switches to vertical when the container is narrower than the threshold', async () => {
      const root = render_('360px')

      await expect.poll(() => root.className).toContain('s-stepper--vertical')
      expect(root.getAttribute('data-orientation')).toBe('vertical')
      // The label moves to the vertical layout default since no value is set.
      expect(root.className).toContain('s-stepper--label-end')
    })

    /**
     * The switch back is also checked in a flex container: once collapsed, the stepper shrinks
     * to its content there, and measuring its own width would keep it vertical forever.
     */
    it.each([
      ['block', 'display: block'],
      ['flex', 'display: flex'],
    ])('switches back when space returns, in a %s container', async (_, style) => {
      const containerWidth = ref('360px')
      const { container } = render({
        render: () =>
          h('div', { style: `${style}; inline-size: ${containerWidth.value}` }, [
            h(SStepper, { items, modelValue: 1, stackAt: 600 }),
          ]),
      })
      const root = container.querySelector('.s-stepper')!
      await expect.poll(() => root.className).toContain('s-stepper--vertical')

      containerWidth.value = '900px'
      await expect.poll(() => root.className).toContain('s-stepper--horizontal')
      expect(root.getAttribute('data-orientation')).toBe('horizontal')
    })

    it('stays horizontal while there is enough width', async () => {
      const root = render_('900px')

      await expect.poll(() => root.className).toContain('s-stepper--horizontal')
      expect(root.getAttribute('data-orientation')).toBe('horizontal')
    })
  })

  /**
   * A step takes as much as its label needs, and the connector takes the remaining width: with
   * equal shares per step, the outer labels would sit in the middle of their share, leaving
   * empty margins at the stepper edges.
   */
  it.each(['bottom', 'top', 'start', 'end'] as const)(
    'horizontal: moves the outer labels to the edges with placement %s',
    (placement) => {
      const { root, triggers } = stepper('horizontal', placement)

      expect(box(triggers[0]).left - box(root).left).toBeLessThan(1)
      expect(box(root).right - box(triggers[triggers.length - 1]).right).toBeLessThan(1)
    },
  )

  /**
   * In a tight container the label wraps by words, and each step stays within its bounds:
   * shrinking below min-content would let the label spill over the neighboring step.
   */
  it.each(['bottom', 'top', 'start', 'end'] as const)(
    'horizontal: keeps steps from overlapping with placement %s',
    (placement) => {
      const { triggers } = stepper('horizontal', placement, '360px')

      for (let i = 1; i < triggers.length; i += 1) {
        expect(box(triggers[i]).left).toBeGreaterThanOrEqual(box(triggers[i - 1]).right)
      }
    },
  )

  /**
   * With a side label the circle is not the middle of the step, so the connector turns
   * from a line over the step into a link between steps — this checks that it separates them.
   */
  it.each(['end', 'start'] as const)(
    'horizontal: separates steps with the connector with label %s',
    (placement) => {
      const { indicators, separators } = stepper('horizontal', placement)
      const line = box(separators[0])

      expect(line.width).toBeGreaterThan(0)
      expect(line.left).toBeGreaterThanOrEqual(box(indicators[0]).right)
      expect(line.right).toBeLessThanOrEqual(box(indicators[1]).left)
    },
  )

  /**
   * A label under the circle is centered in the vertical layout too. Steps with labels of
   * different widths do not form a staircase: the circles stay on one axis.
   */
  it.each(['bottom', 'top'] as const)(
    'vertical: centers the label under the circle with placement %s',
    (placement) => {
      const { indicators, root } = stepper('vertical', placement)
      const titles = [...root.querySelectorAll('.s-stepper__title')]

      titles.forEach((title, i) => {
        expect(Math.abs(centerX(title) - centerX(indicators[i]))).toBeLessThan(1)
      })
      for (const dot of indicators)
        expect(Math.abs(centerX(dot) - centerX(indicators[0]))).toBeLessThan(1)
    },
  )

  it('linear mode does not dim unavailable steps, an explicitly disabled one is dimmed', () => {
    const { container } = render(SStepper, {
      props: {
        items: [
          { title: 'Sender' },
          { title: 'Recipient' },
          { title: 'Cargo' },
          { title: 'Payment', disabled: true },
        ],
        modelValue: 1,
        linear: true,
      },
    })
    const triggers = [...container.querySelectorAll('.s-stepper__trigger')]

    expect(triggers[2]).toHaveAttribute('data-disabled')
    expect(getComputedStyle(triggers[2]).opacity).toBe('1')
    expect(getComputedStyle(triggers[3]).opacity).toBe('0.38')
  })

  it('active-variant="filled" fills the current step with the accent, like a completed one', () => {
    const { container } = render(SStepper, {
      props: { items, modelValue: 2, activeVariant: 'filled' },
    })
    const [done, active] = [...container.querySelectorAll('.s-stepper__indicator')]

    expect(getComputedStyle(active).backgroundColor).toBe(getComputedStyle(done).backgroundColor)
  })

  it('narrow-orientation turns a vertical stepper into a row when narrow', async () => {
    const { container } = render(SStepper, {
      props: {
        items,
        modelValue: 1,
        orientation: 'vertical',
        stackAt: 600,
        narrowOrientation: 'horizontal',
      },
    })
    ;(container as HTMLElement).style.inlineSize = '360px'
    const root = container.querySelector('.s-stepper')!

    await expect.poll(() => root.className).toContain('s-stepper--horizontal')
    expect(root.getAttribute('data-orientation')).toBe('horizontal')
  })
})
