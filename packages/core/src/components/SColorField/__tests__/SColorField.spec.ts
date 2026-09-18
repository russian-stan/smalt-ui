import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { SColorField } from '../index'

describe('SColorField', () => {
  it('renders the label and the input', () => {
    render(SColorField, { props: { label: 'Primary color' } })
    expect(screen.getByText('Primary color')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shows the model value in the input', () => {
    render(SColorField, { props: { modelValue: '#3B82F6' } })
    expect((screen.getByRole('textbox') as HTMLInputElement).value.toLowerCase()).toBe('#3b82f6')
  })

  it('paints the preview swatch with the current color', () => {
    const { container } = render(SColorField, { props: { modelValue: '#ff0000' } })
    const swatch = container.querySelector('.s-color-field__swatch') as HTMLElement
    expect(swatch.style.backgroundColor).toBe('#ff0000')
  })

  it('links the error and marks the field invalid', () => {
    render(SColorField, { props: { label: 'Color', error: 'Invalid format' } })
    expect(screen.getByText('Invalid format')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('applies the size class', () => {
    const { container } = render(SColorField, { props: { size: 'lg' } })
    expect(container.querySelector('.s-color-field')).toHaveClass('s-color-field--lg')
  })

  it('renders the prepend/append slots inside the border', () => {
    const { container } = render(SColorField, {
      slots: { prepend: () => 'P', append: () => 'A' },
    })
    const control = container.querySelector('.s-color-field__control')
    expect(control?.querySelector('.s-color-field__prepend')?.textContent).toBe('P')
    expect(control?.querySelector('.s-color-field__append')?.textContent).toBe('A')
  })
})
