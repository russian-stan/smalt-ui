import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SStepper } from '../index'
import type { SStepperItem } from '../index'

const items: SStepperItem[] = [
  { title: 'Delivery', description: 'Address and method' },
  { title: 'Payment' },
  { title: 'Done' },
]

describe('SStepper', () => {
  it('renders step titles and descriptions', () => {
    render(SStepper, { props: { items, modelValue: 1 } })
    expect(screen.getByText('Delivery')).toBeInTheDocument()
    expect(screen.getByText('Address and method')).toBeInTheDocument()
    expect(screen.getByText('Payment')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('numbers the steps automatically', () => {
    const { container } = render(SStepper, { props: { items, modelValue: 1 } })
    const numbers = [...container.querySelectorAll('.s-stepper__number')].map((n) =>
      n.textContent?.trim(),
    )
    expect(numbers).toEqual(['1', '2', '3'])
  })

  it('marks the active step with data-state="active"', () => {
    const { container } = render(SStepper, { props: { items, modelValue: 2 } })
    const active = container.querySelector('.s-stepper__item[data-state="active"]')
    expect(active).not.toBeNull()
    expect(active?.textContent).toContain('Payment')
  })

  it('marks completed steps with data-state="completed"', () => {
    const { container } = render(SStepper, { props: { items, modelValue: 2 } })
    const completed = container.querySelectorAll('.s-stepper__item[data-state="completed"]')
    expect(completed.length).toBe(1)
    expect(completed[0].textContent).toContain('Delivery')
  })

  it('applies the orientation class', () => {
    const { container } = render(SStepper, {
      props: { items, modelValue: 1, orientation: 'vertical' },
    })
    expect(container.querySelector('.s-stepper')).toHaveClass('s-stepper--vertical')
  })

  it('draws a check mark in the completed step indicator', () => {
    const { container } = render(SStepper, { props: { items, modelValue: 2 } })
    const check = container.querySelector(
      '.s-stepper__item[data-state="completed"] .s-stepper__check path',
    )
    expect(check?.getAttribute('d')).toBe('M20 6 9 17l-5-5')
  })

  it.each(['top', 'bottom', 'start', 'end'] as const)(
    'sets the label placement class label-placement="%s"',
    (placement) => {
      const { container } = render(SStepper, {
        props: { items, modelValue: 1, labelPlacement: placement },
      })
      expect(container.querySelector('.s-stepper')).toHaveClass(`s-stepper--label-${placement}`)
    },
  )

  /**
   * The prop has no shared default: a value that fits one orientation would move the label in
   * the other.
   */
  it.each([
    ['horizontal', 's-stepper--label-bottom'],
    ['vertical', 's-stepper--label-end'],
  ] as const)('without the prop labels steps with the default for %s', (orientation, expected) => {
    const { container } = render(SStepper, { props: { items, modelValue: 1, orientation } })
    expect(container.querySelector('.s-stepper')).toHaveClass(expected)
  })

  it('replaces the number with the step icon from item.icon', () => {
    const withIcon: SStepperItem[] = [{ title: 'Step', icon: 'M0 0h24' }]
    const { container } = render(SStepper, { props: { items: withIcon, modelValue: 1 } })
    expect(container.querySelector('.s-stepper__indicator path')?.getAttribute('d')).toBe('M0 0h24')
    expect(container.querySelector('.s-stepper__number')).toBeNull()
  })
})
