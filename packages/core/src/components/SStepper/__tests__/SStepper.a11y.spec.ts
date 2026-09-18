import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SStepper } from '../index'
import type { SStepperItem } from '../index'

const items: SStepperItem[] = [
  { title: 'Delivery', description: 'Address and method' },
  { title: 'Payment' },
  { title: 'Done' },
]

describe('SStepper · a11y', () => {
  it('has no violations (horizontal)', async () => {
    const { container } = render(SStepper, { props: { items, modelValue: 2 } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (vertical)', async () => {
    const { container } = render(SStepper, {
      props: { items, modelValue: 1, orientation: 'vertical' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
