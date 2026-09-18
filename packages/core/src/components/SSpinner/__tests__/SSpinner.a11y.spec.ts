import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SSpinner } from '../index'

describe('SSpinner · a11y', () => {
  it('has no violations (decorative)', async () => {
    const { container } = render(SSpinner, { props: { size: 'lg' } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (with a label)', async () => {
    const { container } = render(SSpinner, { props: { label: 'Loading data' } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
