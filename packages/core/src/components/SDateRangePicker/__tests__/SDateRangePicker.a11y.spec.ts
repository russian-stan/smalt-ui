import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { CalendarDate } from '@internationalized/date'
import { SDateRangePicker } from '../index'

describe('SDateRangePicker · a11y', () => {
  it('has no violations (empty)', async () => {
    const { container } = render(SDateRangePicker, {
      props: { label: 'Period', locale: 'en-US' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (with a range and an error)', async () => {
    const { container } = render(SDateRangePicker, {
      props: {
        label: 'Period',
        error: 'Invalid range',
        modelValue: {
          start: new CalendarDate(2026, 7, 11),
          end: new CalendarDate(2026, 7, 20),
        },
        locale: 'en-US',
      },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
