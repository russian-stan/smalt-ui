import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SDrawer } from '../index'

describe('SDrawer · a11y', () => {
  it('has no violations when open', async () => {
    // The drawer panel is teleported to body, so axe runs on baseElement.
    const { baseElement } = render(SDrawer, {
      props: { open: true, title: 'Settings', description: 'Account preferences', side: 'right' },
      slots: { default: 'Panel content' },
    })
    await screen.findByRole('dialog')
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
