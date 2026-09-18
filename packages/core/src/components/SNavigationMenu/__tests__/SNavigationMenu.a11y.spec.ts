import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SNavigationMenu } from '../index'

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', links: [{ label: 'Analytics', href: '/analytics' }] },
]

describe('SNavigationMenu · a11y', () => {
  it('has no violations (collapsed)', async () => {
    const { container } = render(SNavigationMenu, { props: { items, ariaLabel: 'Main' } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (panel open)', async () => {
    const { container } = render(SNavigationMenu, { props: { items, ariaLabel: 'Main' } })
    await fireEvent.click(screen.getByRole('button', { name: /Products/ }))
    await screen.findByRole('link', { name: /Analytics/ })
    // Reka FocusScope adds focus guards (aria-hidden + tabindex), a known artifact.
    expect(
      await axe(container, { rules: { 'aria-hidden-focus': { enabled: false } } }),
    ).toHaveNoViolations()
  })
})
