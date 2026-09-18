import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SHoverCard } from '../index'

const trigger = '<a href="#">@alex</a>'

describe('SHoverCard · a11y', () => {
  it('has no violations (closed)', async () => {
    const { container } = render(SHoverCard, { slots: { trigger } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (open)', async () => {
    render(SHoverCard, {
      props: { open: true },
      slots: { trigger, default: 'Alex Johnson — frontend developer' },
    })
    await screen.findByText(/Alex Johnson/)
    /**
     * The `region` rule is a page-level best practice (content outside landmarks); it does not
     * apply to an isolated card render, and HoverCard has no ARIA role on purpose.
     */
    expect(await axe(document.body, { rules: { region: { enabled: false } } })).toHaveNoViolations()
  })
})
