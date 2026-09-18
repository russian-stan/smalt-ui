import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { CalendarDate } from '@internationalized/date'
import { SCalendar } from '../index'

const july2026 = new CalendarDate(2026, 7, 11)

describe('SCalendar', () => {
  it('renders the grid with the month heading', () => {
    const { container } = render(SCalendar, { props: { modelValue: july2026, locale: 'en-US' } })
    expect(container.querySelector('.s-calendar__grid')).toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveTextContent(/july 2026/i)
  })

  it('renders the navigation buttons', () => {
    render(SCalendar, { props: { modelValue: july2026, locale: 'en-US' } })
    expect(screen.getByRole('button', { name: 'Previous month' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next month' })).toBeInTheDocument()
  })

  it('renders seven weekday columns', () => {
    const { container } = render(SCalendar, { props: { modelValue: july2026, locale: 'en-US' } })
    expect(container.querySelectorAll('.s-calendar__weekday')).toHaveLength(7)
  })

  it('marks the selected date with data-selected', () => {
    const { container } = render(SCalendar, { props: { modelValue: july2026, locale: 'en-US' } })
    const selected = container.querySelectorAll('.s-calendar__day[data-selected]')
    expect(selected.length).toBeGreaterThanOrEqual(1)
    expect(selected[0].textContent?.trim()).toBe('11')
  })

  it('renders days as gridcell cells', () => {
    render(SCalendar, { props: { modelValue: july2026, locale: 'en-US' } })
    expect(screen.getByRole('button', { name: /11/ })).toBeInTheDocument()
  })
})
