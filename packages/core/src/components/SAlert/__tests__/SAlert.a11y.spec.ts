import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SAlert } from '../index'

describe('SAlert · a11y', () => {
  it('has no violations with a title and close button', async () => {
    const { container } = render(SAlert, {
      props: { variant: 'warning', title: 'Attention', closable: true },
      slots: { default: 'Check your input' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
