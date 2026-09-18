import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SAvatar } from '../index'

describe('SAvatar · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(SAvatar, { props: { fallback: 'AB' } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
