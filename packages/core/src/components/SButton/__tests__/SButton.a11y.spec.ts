import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SButton } from '../index'

describe('SButton · a11y', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(SButton, { slots: { default: 'Button' } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations when disabled', async () => {
    const { container } = render(SButton, {
      props: { disabled: true },
      slots: { default: 'Button' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
