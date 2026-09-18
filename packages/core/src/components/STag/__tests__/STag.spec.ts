import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { STag } from '../index'

describe('STag', () => {
  it('renders slot content', () => {
    render(STag, { slots: { default: 'Vue' } })
    expect(screen.getByText('Vue')).toBeInTheDocument()
  })

  it('applies variant and size as SBadge classes', () => {
    const { container } = render(STag, {
      props: { variant: 'primary', size: 'sm' },
      slots: { default: 'X' },
    })
    const badge = container.querySelector('.s-tag')
    expect(badge).toHaveClass('s-badge--primary')
    expect(badge).toHaveClass('s-badge--sm')
  })

  it('shows no remove button without removable', () => {
    render(STag, { slots: { default: 'X' } })
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('removable renders a button and emits remove on click', async () => {
    const { emitted } = render(STag, {
      props: { removable: true, removeLabel: 'Remove' },
      slots: { default: 'Vue' },
    })
    const btn = screen.getByRole('button', { name: 'Remove' })
    await fireEvent.click(btn)
    expect(emitted().remove).toBeTruthy()
  })

  it('the remove slot replaces the built-in button', () => {
    render(STag, {
      props: { removable: true },
      slots: { default: 'X', remove: '<span data-testid="custom">*</span>' },
    })
    expect(screen.getByTestId('custom')).toBeInTheDocument()
    // No built-in button: the control comes from the slot.
    expect(screen.queryByRole('button')).toBeNull()
  })
})
