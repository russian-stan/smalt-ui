import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { STree } from '../index'
import type { STreeItem } from '../index'

const items: STreeItem[] = [
  {
    label: 'Documents',
    value: 'docs',
    children: [{ label: 'Report.pdf', value: 'report' }],
  },
  { label: 'Images', value: 'images' },
]

describe('STree · a11y', () => {
  it('has no violations (collapsed)', async () => {
    const { container } = render(STree, { props: { items } })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no violations (expanded)', async () => {
    const { container } = render(STree, { props: { items, defaultExpanded: ['docs'] } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
