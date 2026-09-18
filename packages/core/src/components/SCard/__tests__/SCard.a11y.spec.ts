import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SCard } from '../index'

describe('SCard · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(SCard, {
      slots: { header: 'Plan', default: 'Plan description', footer: 'Learn more' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
