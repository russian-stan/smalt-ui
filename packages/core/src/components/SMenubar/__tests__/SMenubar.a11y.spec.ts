import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SMenubar } from '../index'

const menus = [
  { label: 'File', items: [{ label: 'Open', value: 'open' }] },
  { label: 'Edit', items: [{ label: 'Copy', value: 'copy' }] },
]

describe('SMenubar · a11y', () => {
  it('has no violations (closed)', async () => {
    const { container } = render(SMenubar, { props: { menus, ariaLabel: 'Menu' } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (menu open)', async () => {
    render(SMenubar, { props: { menus, ariaLabel: 'Menu' } })
    // Menubar opens on pointerdown+up.
    const trigger = screen.getByRole('menuitem', { name: 'File' })
    await fireEvent.pointerDown(trigger, { button: 0 })
    await fireEvent.pointerUp(trigger, { button: 0 })
    const menu = await screen.findByRole('menu')
    expect(await axe(menu)).toHaveNoViolations()
  })
})
