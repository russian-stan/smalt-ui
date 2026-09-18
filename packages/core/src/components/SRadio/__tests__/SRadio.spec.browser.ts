import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { userEvent } from 'vitest/browser'
import { SRadioGroup } from '../../SRadioGroup'
import { SRadio } from '../index'

/** Label geometry and a click on empty row space: happy-dom does not compute layout. */
describe('SRadio · browser', () => {
  function group(radio: string) {
    const { container } = render({
      components: { SRadioGroup, SRadio },
      template: `
        <div style="inline-size: 480px">
          <SRadioGroup aria-label="Plan" model-value="a">
            <SRadio value="a" label="Economy" />
            ${radio}
          </SRadioGroup>
        </div>
      `,
    })
    return container.querySelectorAll('.s-radio')[1]
  }

  it('stretch extends the label to the edge, clicking empty space selects the option', async () => {
    const root = group('<SRadio value="b" label="Express" stretch />')
    const label = root.querySelector('.s-radio__label')!
    expect(
      Math.abs(label.getBoundingClientRect().right - root.getBoundingClientRect().right),
    ).toBeLessThan(1)

    const box = label.getBoundingClientRect()
    await userEvent.click(label, { position: { x: box.width - 4, y: box.height / 2 } })
    expect(screen.getByRole('radio', { name: 'Express' })).toBeChecked()
  })

  it('align="center" centers the dot on a multi-line label', () => {
    const root = group(
      '<SRadio value="b" align="center"><div>Express</div><div>More about the plan</div></SRadio>',
    )
    const dot = root.querySelector('.s-radio__control')!.getBoundingClientRect()
    const rootBox = root.getBoundingClientRect()
    expect(Math.abs(dot.top + dot.height / 2 - (rootBox.top + rootBox.height / 2))).toBeLessThan(1)
  })
})
