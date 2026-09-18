import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SPinInput } from '../index'

describe('SPinInput · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(SPinInput, {
      props: { length: 4, label: 'SMS code', hint: 'Enter 4 digits' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (invalid)', async () => {
    const { container } = render(SPinInput, {
      props: { length: 6, label: 'Code', error: 'Invalid code' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
