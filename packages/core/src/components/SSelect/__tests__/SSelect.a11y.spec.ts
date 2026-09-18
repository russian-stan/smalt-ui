import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SSelect } from '../index'
import type { SSelectOption } from '../types'

const options: SSelectOption[] = [
  { label: 'New York', value: 'ny' },
  { label: 'Los Angeles', value: 'la' },
]

describe('SSelect · a11y', () => {
  it('has no violations when closed', async () => {
    const { container } = render(SSelect, {
      props: { options, placeholder: 'Choose a city', ariaLabel: 'City' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations when searchable (closed)', async () => {
    const { container } = render(SSelect, {
      props: { options, searchable: true, label: 'City', hint: 'Start typing a name' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations when searchable (list open)', async () => {
    render(SSelect, { props: { options, searchable: true, label: 'City' } })
    await fireEvent.click(screen.getByRole('button', { name: 'Show options' }))
    // Portal: the options list subtree is checked.
    const listbox = await screen.findByRole('listbox')
    expect(await axe(listbox)).toHaveNoViolations()
  })

  it('has no violations with multiple selection as tags', async () => {
    const { container } = render(SSelect, {
      props: { options, useTags: true, modelValue: ['ny', 'la'], label: 'Cities' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
