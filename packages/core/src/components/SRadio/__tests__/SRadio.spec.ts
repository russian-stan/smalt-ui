import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SRadioGroup } from '../../SRadioGroup'
import { SRadio } from '../index'

describe('SRadio', () => {
  it('renders a label associated with the radio inside a group', () => {
    render({
      components: { SRadioGroup, SRadio },
      template: `
        <SRadioGroup aria-label="Choice">
          <SRadio value="a" label="Option A" />
          <SRadio value="b" label="Option B" disabled />
        </SRadioGroup>
      `,
    })
    expect(screen.getByRole('radio', { name: 'Option A' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeDisabled()
  })
})
