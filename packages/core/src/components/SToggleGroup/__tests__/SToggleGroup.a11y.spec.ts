import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SToggleGroup } from '../index'

describe('SToggleGroup · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(SToggleGroup, {
      props: {
        ariaLabel: 'Formatting',
        options: [
          { value: 'b', label: 'B' },
          { value: 'i', label: 'I' },
        ],
      },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
