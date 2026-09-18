import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SContextMenu } from '../index'

const area = '<div>area</div>'

describe('SContextMenu · a11y', () => {
  it('has no violations (closed)', async () => {
    const { container } = render(SContextMenu, {
      props: { items: [{ label: 'Copy', value: 'copy' }] },
      slots: { default: area },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (open)', async () => {
    render(SContextMenu, {
      props: {
        ariaLabel: 'Actions',
        items: [
          { type: 'label', label: 'Edit' },
          { label: 'Copy', value: 'copy' },
          { type: 'separator' },
          { label: 'Delete', value: 'delete', danger: true },
        ],
      },
      slots: { default: area },
    })
    await fireEvent.contextMenu(screen.getByText('area'))
    // The menu is modal: scan the panel subtree, not document.body.
    const menu = await screen.findByRole('menu')
    expect(await axe(menu)).toHaveNoViolations()
  })
})
