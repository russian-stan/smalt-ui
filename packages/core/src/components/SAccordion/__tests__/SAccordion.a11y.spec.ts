import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SAccordion } from '../index'

const items = [
  { value: 'a', title: 'Section A', content: 'Content A' },
  { value: 'b', title: 'Section B', content: 'Content B' },
]

describe('SAccordion · a11y', () => {
  it('has no violations (collapsed)', async () => {
    const { container } = render(SAccordion, { props: { items } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (section expanded)', async () => {
    const { container } = render(SAccordion, { props: { items, modelValue: 'a' } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
