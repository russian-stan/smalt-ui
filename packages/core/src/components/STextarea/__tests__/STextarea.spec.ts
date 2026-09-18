import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { STextarea } from '../index'

describe('STextarea', () => {
  it('links the label to the field', () => {
    render(STextarea, { props: { label: 'Comment' } })
    const field = screen.getByLabelText('Comment')
    expect(field.tagName).toBe('TEXTAREA')
  })

  it('updates v-model on input', async () => {
    const { emitted } = render(STextarea, { props: { label: 'Comment', modelValue: '' } })
    await fireEvent.update(screen.getByLabelText('Comment'), 'Text')
    expect(emitted()['update:modelValue']).toContainEqual(['Text'])
  })

  it('size sets the field size class', () => {
    const { container } = render(STextarea, { props: { size: 'sm' } })
    expect(container.querySelector('.s-textarea')).toHaveClass('s-textarea--sm')
  })

  it('passes rows through', () => {
    render(STextarea, { props: { label: 'Comment', rows: 6 } })
    expect(screen.getByLabelText('Comment')).toHaveAttribute('rows', '6')
  })

  it('error marks the field invalid', () => {
    render(STextarea, { props: { label: 'Comment', error: 'Too short' } })
    expect(screen.getByLabelText('Comment')).toHaveAttribute('aria-invalid', 'true')
  })

  it('disabled disables the field', () => {
    render(STextarea, { props: { label: 'Comment', disabled: true } })
    expect(screen.getByLabelText('Comment')).toBeDisabled()
  })

  it('renders the prepend/append slots inside the border', () => {
    const { container } = render(STextarea, {
      props: { label: 'Comment' },
      slots: {
        prepend: '<span data-test="pre">P</span>',
        append: '<span data-test="app">A</span>',
      },
    })
    const wrap = container.querySelector('.s-textarea__wrap')
    expect(wrap?.querySelector('.s-textarea__prepend [data-test="pre"]')).toBeTruthy()
    expect(wrap?.querySelector('.s-textarea__append [data-test="app"]')).toBeTruthy()
  })

  it('passes native attributes and blur to the textarea itself', async () => {
    const onBlur = vi.fn()
    render(STextarea, {
      props: { label: 'Comment' },
      attrs: { maxlength: 200, onBlur },
    })
    const field = screen.getByLabelText('Comment')
    expect(field).toHaveAttribute('maxlength', '200')
    await fireEvent.blur(field)
    expect(onBlur).toHaveBeenCalled()
  })
})
