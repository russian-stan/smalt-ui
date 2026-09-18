import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { Time } from '@internationalized/date'
import { STimeField } from '../index'

describe('STimeField · a11y', () => {
  it('has no violations (empty)', async () => {
    const { container } = render(STimeField, { props: { label: 'Time', locale: 'en-US' } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (with a value and an error)', async () => {
    const { container } = render(STimeField, {
      props: {
        label: 'Time',
        error: 'Invalid time',
        modelValue: new Time(14, 30),
        locale: 'en-US',
      },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
