import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { SDrawer } from '../index'

const triggerBtn = '<button type="button">Open</button>'

describe('SDrawer', () => {
  it('renders the trigger, the drawer is closed', () => {
    render(SDrawer, { props: { title: 'Menu' }, slots: { trigger: triggerBtn, default: 'Body' } })
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
    expect(screen.queryByText('Body')).toBeNull()
  })

  it('is open with open=true and attached to the given side', async () => {
    render(SDrawer, {
      props: { open: true, title: 'Settings', side: 'left' },
      slots: { default: 'Content' },
    })
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(document.querySelector('.s-drawer__content')).toHaveClass('s-drawer__content--left')
  })

  it('defaults to the right side', async () => {
    render(SDrawer, { props: { open: true, title: 'X' }, slots: { default: 'body' } })
    await screen.findByRole('dialog')
    expect(document.querySelector('.s-drawer__content')).toHaveClass('s-drawer__content--right')
  })

  it('closes with the close button (v-model:open)', async () => {
    const { emitted } = render(SDrawer, {
      props: { open: true, title: 'X' },
      slots: { default: 'body' },
    })
    await screen.findByRole('dialog')
    await fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(emitted()['update:open']).toBeTruthy()
    expect(emitted()['update:open'].at(-1)).toEqual([false])
  })
})
