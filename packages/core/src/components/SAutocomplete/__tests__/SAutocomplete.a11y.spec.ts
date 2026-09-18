import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SAutocomplete } from '../index'

const options = [
  { label: 'New York', value: 'nyc' },
  { label: 'San Francisco', value: 'sf' },
]

describe('SAutocomplete · a11y', () => {
  it('labeled field has no violations', async () => {
    const { container } = render(SAutocomplete, { props: { options, label: 'City' } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('field with an error has no violations', async () => {
    const { container } = render(SAutocomplete, {
      props: { options, label: 'City', error: 'Select a city', required: true },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('open suggestion list has no violations', async () => {
    render(SAutocomplete, { props: { options, label: 'City' } })
    await fireEvent.keyDown(screen.getByLabelText('City'), { key: 'ArrowDown' })
    const listbox = await screen.findByRole('listbox')
    expect(await axe(listbox)).toHaveNoViolations()
  })
})
