import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { h } from 'vue'
import { SFormField } from '../index'

function renderField(props: Record<string, unknown>) {
  return render(SFormField, {
    props,
    slots: {
      default: (slotProps: { id: string; describedBy?: string; invalid: boolean }) =>
        h('input', {
          id: slotProps.id,
          'aria-describedby': slotProps.describedBy,
          'aria-invalid': slotProps.invalid || undefined,
        }),
    },
  })
}

describe('SFormField · a11y', () => {
  it('has no violations with label and hint', async () => {
    const { container } = renderField({ label: 'Name', hint: 'How should we address you' })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations when invalid', async () => {
    const { container } = renderField({ label: 'Email', error: 'Required field' })
    expect(await axe(container)).toHaveNoViolations()
  })
})
