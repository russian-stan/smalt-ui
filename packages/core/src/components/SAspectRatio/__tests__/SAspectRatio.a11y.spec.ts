import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SAspectRatio } from '../index'

describe('SAspectRatio · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(SAspectRatio, { slots: { default: 'Content' } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
