import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SColorField } from '../index'

describe('SColorField · a11y', () => {
  it('has no violations (empty)', async () => {
    const { container } = render(SColorField, { props: { label: 'Color' } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (with a value and an error)', async () => {
    const { container } = render(SColorField, {
      props: { label: 'Color', error: 'Invalid format', modelValue: '#3B82F6' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
