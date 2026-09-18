import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SToolbar } from '../index'

describe('SToolbar · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(SToolbar, { slots: { default: 'Content' } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
