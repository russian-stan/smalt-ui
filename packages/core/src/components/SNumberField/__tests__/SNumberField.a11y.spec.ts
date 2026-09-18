import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SNumberField } from '../index'

describe('SNumberField · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(SNumberField, {
      props: { modelValue: 3, label: 'Quantity', hint: 'Items in the order' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (invalid)', async () => {
    const { container } = render(SNumberField, {
      props: { modelValue: 0, label: 'Quantity', error: 'Minimum is 1' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
