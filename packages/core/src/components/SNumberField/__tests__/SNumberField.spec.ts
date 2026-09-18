import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { SNumberField } from '../index'
import { installDefaults } from '../../../composables'

describe('SNumberField', () => {
  it('renders the field with a label and the current value', () => {
    render(SNumberField, { props: { modelValue: 5, label: 'Quantity' } })
    expect(screen.getByRole('spinbutton', { name: 'Quantity' })).toBeInTheDocument()
  })

  it('a global floatingLabel default does not remove the label', () => {
    render(SNumberField, {
      props: { modelValue: 5, label: 'Quantity' },
      global: { plugins: [(app) => installDefaults(app, { global: { floatingLabel: true } })] },
    })
    expect(screen.getByRole('spinbutton', { name: 'Quantity' })).toBeInTheDocument()
  })

  it('renders the step buttons', () => {
    render(SNumberField, { props: { modelValue: 5, label: 'Qty' } })
    expect(screen.getByRole('button', { name: 'Increase' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeInTheDocument()
  })

  it('increments the value with ArrowUp (v-model)', async () => {
    const { emitted } = render(SNumberField, { props: { modelValue: 5, step: 1, label: 'Qty' } })
    await fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'ArrowUp' })
    expect(emitted()['update:modelValue']).toBeTruthy()
    expect(emitted()['update:modelValue'].at(-1)).toEqual([6])
  })

  it('decrements the value with ArrowDown (v-model)', async () => {
    const { emitted } = render(SNumberField, { props: { modelValue: 5, label: 'Qty' } })
    await fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'ArrowDown' })
    expect(emitted()['update:modelValue'].at(-1)).toEqual([4])
  })

  it('disabled disables the control', () => {
    const { container } = render(SNumberField, { props: { modelValue: 1, disabled: true } })
    expect(container.querySelector('.s-number-field__control')).toHaveAttribute('data-disabled')
  })
})
