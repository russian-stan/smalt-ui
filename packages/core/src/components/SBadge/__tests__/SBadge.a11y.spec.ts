import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SBadge } from '../index'

describe('SBadge · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(SBadge, {
      props: { variant: 'primary' },
      slots: { default: 'Beta' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
