import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SCollapsible } from '../index'

describe('SCollapsible · a11y', () => {
  it('has no violations (collapsed)', async () => {
    const { container } = render(SCollapsible, {
      props: { title: 'Details' },
      slots: { default: 'Content' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (expanded)', async () => {
    const { container } = render(SCollapsible, {
      props: { title: 'Details', open: true },
      slots: { default: 'Content' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
