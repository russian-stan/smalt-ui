import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SDropdownMenu } from '../index'

const triggerBtn = '<button type="button">Menu</button>'

describe('SDropdownMenu · a11y', () => {
  it('has no violations (closed)', async () => {
    const { container } = render(SDropdownMenu, {
      props: { items: [{ label: 'Profile', value: 'p' }] },
      slots: { trigger: triggerBtn },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (open)', async () => {
    render(SDropdownMenu, {
      props: {
        open: true,
        ariaLabel: 'User menu',
        items: [
          { type: 'label', label: 'Account' },
          { label: 'Profile', value: 'profile' },
          { type: 'separator' },
          { label: 'Log out', value: 'logout', danger: true },
        ],
      },
      slots: { trigger: triggerBtn },
    })
    await screen.findByRole('menuitem', { name: 'Profile' })
    /**
     * The menu is modal: Reka hides the background (aria-hidden) and adds focus guards,
     * so check the subtree of the menu panel itself, not the whole body.
     */
    const menu = await screen.findByRole('menu')
    expect(await axe(menu)).toHaveNoViolations()
  })
})
