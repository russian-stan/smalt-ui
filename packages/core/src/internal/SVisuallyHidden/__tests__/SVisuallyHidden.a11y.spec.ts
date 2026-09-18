import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SVisuallyHidden } from '../index'

describe('SVisuallyHidden · a11y', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(SVisuallyHidden, {
      slots: { default: 'Text available to screen readers' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
