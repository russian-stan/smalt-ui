import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { CalendarDate } from '@internationalized/date'
import { SCalendar } from '../index'

describe('SCalendar · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(SCalendar, {
      props: { modelValue: new CalendarDate(2026, 7, 11), locale: 'en-US' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
