import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SColorPicker } from '../index'

describe('SColorPicker · a11y', () => {
  it('has no violations (closed trigger)', async () => {
    const { container } = render(SColorPicker, {
      props: { label: 'Color', modelValue: '#3B82F6' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (open panel)', async () => {
    render(SColorPicker, {
      props: { modelValue: '#3B82F6', swatches: ['#ff0000', '#00ff00'], withAlpha: true },
    })
    await fireEvent.click(screen.getByRole('button', { name: 'Pick a color' }))
    const panel = document.querySelector('.s-color-picker__panel') as HTMLElement
    expect(await axe(panel)).toHaveNoViolations()
  })
})
