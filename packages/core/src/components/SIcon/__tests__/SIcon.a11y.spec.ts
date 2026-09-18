import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { h } from 'vue'
import { SIcon } from '../index'

const path = () => h('path', { d: 'M5 12h14' })

describe('SIcon · a11y', () => {
  it('a decorative icon has no violations (aria-hidden)', async () => {
    const { container } = render(SIcon, { slots: { default: path } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('an icon with an accessible name has no violations (role=img)', async () => {
    const { container } = render(SIcon, {
      props: { label: 'Arrow' },
      slots: { default: path },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
