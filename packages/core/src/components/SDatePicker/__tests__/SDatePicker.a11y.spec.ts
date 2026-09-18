import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { CalendarDate } from '@internationalized/date'
import { SDatePicker } from '../index'

describe('SDatePicker · a11y', () => {
  it('has no violations (closed)', async () => {
    const { container } = render(SDatePicker, {
      props: { label: 'Date', locale: 'en-US' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (with a value and an error)', async () => {
    const { container } = render(SDatePicker, {
      props: {
        label: 'Date',
        error: 'Invalid date',
        modelValue: new CalendarDate(2026, 7, 11),
        locale: 'en-US',
      },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
