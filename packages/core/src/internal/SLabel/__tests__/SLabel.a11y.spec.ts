import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SLabel } from '../index'

describe('SLabel · a11y', () => {
  it('a label linked to a field has no violations', async () => {
    const { container } = render({
      components: { SLabel },
      template: `<div><SLabel for="f1" required>Name</SLabel><input id="f1" /></div>`,
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
