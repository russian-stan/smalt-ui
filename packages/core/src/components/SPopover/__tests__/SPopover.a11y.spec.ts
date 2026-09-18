import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SPopover } from '../index'

const triggerBtn = '<button type="button">Menu</button>'

describe('SPopover · a11y', () => {
  it('has no violations (closed)', async () => {
    const { container } = render(SPopover, { slots: { trigger: triggerBtn } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (open)', async () => {
    render(SPopover, {
      props: { open: true, ariaLabel: 'Quick actions' },
      slots: { trigger: triggerBtn, default: 'Panel content' },
    })
    await screen.findByText('Panel content')
    expect(await axe(document.body)).toHaveNoViolations()
  })
})
