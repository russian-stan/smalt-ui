import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SRadioGroup } from '../../SRadioGroup'
import { SRadio } from '../index'

describe('SRadio · a11y', () => {
  it('radio inside a group has no violations', async () => {
    const { container } = render({
      components: { SRadioGroup, SRadio },
      template: `
        <SRadioGroup aria-label="Choice">
          <SRadio value="a" label="Option A" />
          <SRadio value="b" label="Option B" />
        </SRadioGroup>
      `,
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (with a disabled option)', async () => {
    const { container } = render({
      components: { SRadioGroup, SRadio },
      template: `
        <SRadioGroup aria-label="Choice">
          <SRadio value="a" label="Option A" />
          <SRadio value="b" label="Option B" disabled />
        </SRadioGroup>
      `,
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
