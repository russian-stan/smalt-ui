import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SDialog } from '../index'

describe('SDialog · a11y', () => {
  it('has no violations when open', async () => {
    // The dialog is teleported to body, so axe runs on baseElement.
    const { baseElement } = render(SDialog, {
      props: { open: true, title: 'Confirmation', description: 'Action description' },
      slots: { default: 'Content' },
    })
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
