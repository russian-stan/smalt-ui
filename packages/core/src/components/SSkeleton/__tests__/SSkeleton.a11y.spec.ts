import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SSkeleton } from '../index'

describe('SSkeleton · a11y', () => {
  it('has no violations (decorative placeholder)', async () => {
    const { container } = render(SSkeleton, { props: { variant: 'circle', width: 40, height: 40 } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
