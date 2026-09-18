import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SInput } from '../index'

describe('SInput · a11y', () => {
  it('has no violations with a label', async () => {
    const { container } = render(SInput, {
      props: { label: 'Name', hint: 'How should we address you' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations in the invalid state', async () => {
    const { container } = render(SInput, { props: { label: 'Email', error: 'Required field' } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations in tags mode', async () => {
    const { container } = render(SInput, {
      props: { useTags: true, modelValue: ['vue', 'nuxt'], label: 'Technologies' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations with a mask', async () => {
    const { container } = render(SInput, {
      props: { label: 'Phone', mask: 'phone', modelValue: '(999) 123 - 4567' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
