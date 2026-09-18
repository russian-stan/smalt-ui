import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { STooltip } from '../index'

describe('STooltip · a11y', () => {
  it('has no violations on the trigger', async () => {
    const { container } = render({
      components: { STooltip },
      template: `
        <STooltip content="Help">
          <template #trigger><button aria-label="Help">?</button></template>
        </STooltip>
      `,
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations when opened by a press', async () => {
    render({
      components: { STooltip },
      template: `
        <STooltip
          content="Help"
          trigger="click"
        >
          <template #trigger><button aria-label="Help">?</button></template>
        </STooltip>
      `,
    })

    await fireEvent.click(screen.getByRole('button', { name: 'Help' }))
    await waitFor(() => expect(document.querySelector('.s-tooltip__content')).not.toBeNull())

    /**
     * The bubble is portaled to body, so the whole document is checked. The `region` rule is a
     * page-level best practice (content outside landmarks) and is irrelevant for an isolated
     * tooltip render; the ARIA role lives on the hidden `role="tooltip"` node inside the bubble.
     */
    expect(await axe(document.body, { rules: { region: { enabled: false } } })).toHaveNoViolations()
  })
})
