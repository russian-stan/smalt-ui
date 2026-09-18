import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SSeparator } from '../index'

describe('SSeparator · a11y', () => {
  it('has no violations (basic)', async () => {
    const { container } = render(SSeparator)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (with a label)', async () => {
    const { container } = render(SSeparator, { props: { label: 'or' } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
