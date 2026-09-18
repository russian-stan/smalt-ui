import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { SMenubar } from '../index'

const menus = [
  {
    label: 'File',
    items: [
      { label: 'Open', value: 'open' },
      { type: 'separator' as const },
      { label: 'Quit', value: 'quit', danger: true },
    ],
  },
  { label: 'Edit', items: [{ label: 'Copy', value: 'copy' }] },
]

// Reka Menubar opens a menu on pointerdown+up (not on click).
async function openMenu(name: string) {
  const trigger = screen.getByRole('menuitem', { name })
  await fireEvent.pointerDown(trigger, { button: 0 })
  await fireEvent.pointerUp(trigger, { button: 0 })
}

describe('SMenubar', () => {
  it('renders the menu triggers in the bar', () => {
    render(SMenubar, { props: { menus, ariaLabel: 'Main menu' } })
    expect(screen.getByRole('menubar', { name: 'Main menu' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'File' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
  })

  it('opens a menu and shows its items', async () => {
    render(SMenubar, { props: { menus } })
    await openMenu('File')
    expect(await screen.findByRole('menuitem', { name: 'Open' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Quit' })).toBeInTheDocument()
  })

  it('emits select with the item value', async () => {
    const { emitted } = render(SMenubar, { props: { menus } })
    await openMenu('File')
    const item = await screen.findByRole('menuitem', { name: 'Open' })
    await fireEvent.click(item)
    expect(emitted().select[0]).toEqual(['open'])
  })

  it('renders the item icon by registry name', async () => {
    const iconMenus = [
      { label: 'File', items: [{ label: 'Favorites', value: 'fav', icon: 'star' }] },
    ]
    render(SMenubar, { props: { menus: iconMenus } })
    await openMenu('File')
    await screen.findByRole('menuitem', { name: 'Favorites' })
    const path = document.querySelector('.s-menubar__icon path')
    expect(path).not.toBeNull()
    expect(path?.getAttribute('d')).toBeTruthy()
  })
})
