import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SSplitter } from '../index'

describe('SSplitter · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(SSplitter, {
      props: { panels: [{ defaultSize: 40 }, { defaultSize: 60 }] },
      slots: { 'panel-0': 'Left panel', 'panel-1': 'Right panel' },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
