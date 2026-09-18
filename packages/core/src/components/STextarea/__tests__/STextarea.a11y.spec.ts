import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { STextarea } from '../index'

describe('STextarea · a11y', () => {
  it('has no violations with a label and hint', async () => {
    const { container } = render(STextarea, {
      props: { label: 'Comment', hint: 'Up to 500 characters' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations in the invalid state', async () => {
    const { container } = render(STextarea, {
      props: { label: 'Comment', error: 'Required field' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
