import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { SNavigationMenu } from '../index'

const items = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    links: [
      { label: 'Analytics', href: '/analytics', description: 'Reports and dashboards' },
      { label: 'CRM', href: '/crm' },
    ],
  },
]

describe('SNavigationMenu', () => {
  it('renders navigation with direct links and triggers', () => {
    render(SNavigationMenu, { props: { items, ariaLabel: 'Main' } })
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('button', { name: /Products/ })).toBeInTheDocument()
  })

  it('opens a panel with nested links', async () => {
    render(SNavigationMenu, { props: { items } })
    await fireEvent.click(screen.getByRole('button', { name: /Products/ }))
    expect(await screen.findByRole('link', { name: /Analytics/ })).toHaveAttribute(
      'href',
      '/analytics',
    )
  })
})
