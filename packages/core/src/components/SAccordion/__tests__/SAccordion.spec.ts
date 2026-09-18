import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { SAccordion } from '../index'

const items = [
  { value: 'a', title: 'Section A', content: 'Content A' },
  { value: 'b', title: 'Section B', content: 'Content B' },
  { value: 'c', title: 'Section C', content: 'Content C', disabled: true },
]

describe('SAccordion', () => {
  it('renders section titles from items', () => {
    render(SAccordion, { props: { items } })
    expect(screen.getByRole('button', { name: 'Section A' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Section B' })).toBeInTheDocument()
  })

  it('expands a section on click (v-model)', async () => {
    const { emitted } = render(SAccordion, { props: { items } })
    await fireEvent.click(screen.getByRole('button', { name: 'Section A' }))
    expect(emitted()['update:modelValue'][0]).toEqual(['a'])
    expect(await screen.findByText('Content A')).toBeInTheDocument()
  })

  it('a disabled section is inactive', () => {
    render(SAccordion, { props: { items } })
    expect(screen.getByRole('button', { name: 'Section C' })).toBeDisabled()
  })

  it('the open section is set via v-model', () => {
    render(SAccordion, { props: { items, modelValue: 'b' } })
    expect(screen.getByRole('button', { name: 'Section B' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })
})
