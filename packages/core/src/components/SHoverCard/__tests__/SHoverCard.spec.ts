import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SHoverCard } from '../index'

const trigger = '<a href="#">@alex</a>'

describe('SHoverCard', () => {
  it('renders the trigger with the card hidden by default', () => {
    render(SHoverCard, { slots: { trigger, default: 'Profile' } })
    expect(screen.getByRole('link', { name: '@alex' })).toBeInTheDocument()
    expect(screen.queryByText('Profile')).toBeNull()
  })

  it('shows the content when open=true', async () => {
    render(SHoverCard, {
      props: { open: true },
      slots: { trigger, default: 'Profile card' },
    })
    expect(await screen.findByText('Profile card')).toBeInTheDocument()
  })
})
