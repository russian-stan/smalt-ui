import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SRadioGroup } from '../index'

describe('SRadioGroup · a11y', () => {
  it('has no violations with options', async () => {
    const { container } = render(SRadioGroup, {
      props: {
        ariaLabel: 'Delivery method',
        options: [
          { label: 'Courier', value: 'courier' },
          { label: 'Pickup', value: 'pickup' },
        ],
      },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
