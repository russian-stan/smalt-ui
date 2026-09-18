import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SToggle } from '../index'

describe('SToggle · a11y', () => {
  it('has no violations (text)', async () => {
    const { container } = render(SToggle, { slots: { default: 'Bold' } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (icon + aria-label)', async () => {
    const { container } = render(SToggle, {
      props: { ariaLabel: 'Bold' },
      slots: { default: '<svg aria-hidden="true"></svg>' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations when disabled', async () => {
    const { container } = render(SToggle, {
      props: { disabled: true },
      slots: { default: 'Bold' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
