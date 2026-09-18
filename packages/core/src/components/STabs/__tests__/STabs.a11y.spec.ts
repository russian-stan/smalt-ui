import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { STabs } from '../index'

describe('STabs · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(STabs, {
      props: {
        ariaLabel: 'Sections',
        modelValue: 'a',
        items: [
          { value: 'a', label: 'Overview' },
          { value: 'b', label: 'Details' },
        ],
      },
      slots: { a: 'Product overview', b: 'Technical details' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (with a disabled tab)', async () => {
    const { container } = render(STabs, {
      props: {
        ariaLabel: 'Sections',
        modelValue: 'a',
        items: [
          { value: 'a', label: 'Overview' },
          { value: 'b', label: 'Details', disabled: true },
        ],
      },
      slots: { a: 'Product overview', b: 'Technical details' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
