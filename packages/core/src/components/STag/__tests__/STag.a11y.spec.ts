import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { STag } from '../index'

describe('STag · a11y', () => {
  it('has no violations (static tag)', async () => {
    const { container } = render(STag, { slots: { default: 'Vue' } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (with a remove button)', async () => {
    const { container } = render(STag, {
      props: { removable: true, removeLabel: 'Remove tag' },
      slots: { default: 'Vue' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
