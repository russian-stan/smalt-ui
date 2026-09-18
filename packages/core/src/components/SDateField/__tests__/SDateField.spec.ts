import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { CalendarDate } from '@internationalized/date'
import { SDateField } from '../index'

describe('SDateField', () => {
  it('renders the label and the segment group', () => {
    render(SDateField, { props: { label: 'Date of birth', locale: 'en-US' } })
    expect(screen.getByText('Date of birth')).toBeInTheDocument()
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('renders editable segments (spinbutton) for the value', () => {
    render(SDateField, {
      props: { modelValue: new CalendarDate(2026, 7, 11), locale: 'en-US' },
    })
    expect(screen.getAllByRole('spinbutton')).toHaveLength(3)
  })

  it('links the error and marks the field invalid', () => {
    render(SDateField, { props: { label: 'Date', error: 'Required field', locale: 'en-US' } })
    expect(screen.getByText('Required field')).toBeInTheDocument()
    expect(screen.getByRole('group')).toHaveAttribute('aria-invalid', 'true')
  })

  it('passes disabled through', () => {
    const { container } = render(SDateField, {
      props: { disabled: true, locale: 'en-US' },
    })
    expect(container.querySelector('.s-date-field__control')).toHaveAttribute('data-disabled')
  })

  it('applies the size class', () => {
    const { container } = render(SDateField, { props: { size: 'lg', locale: 'en-US' } })
    expect(container.querySelector('.s-date-field')).toHaveClass('s-date-field--lg')
  })
})
