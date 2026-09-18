import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { STree } from '../index'
import type { STreeItem } from '../index'

const items: STreeItem[] = [
  {
    label: 'Documents',
    value: 'docs',
    children: [
      { label: 'Report.pdf', value: 'report' },
      { label: 'Budget.xlsx', value: 'estimate' },
    ],
  },
  { label: 'Images', value: 'images', children: [{ label: 'Logo.svg', value: 'logo' }] },
]

describe('STree', () => {
  it('renders top-level nodes', () => {
    render(STree, { props: { items } })
    expect(screen.getByText('Documents')).toBeInTheDocument()
    expect(screen.getByText('Images')).toBeInTheDocument()
  })

  it('collapses children by default', () => {
    render(STree, { props: { items } })
    expect(screen.queryByText('Report.pdf')).toBeNull()
  })

  it('expands nodes from defaultExpanded', () => {
    render(STree, { props: { items, defaultExpanded: ['docs'] } })
    expect(screen.getByText('Report.pdf')).toBeInTheDocument()
    expect(screen.getByText('Budget.xlsx')).toBeInTheDocument()
    // A collapsed branch stays hidden.
    expect(screen.queryByText('Logo.svg')).toBeNull()
  })

  it('shows a chevron only on nodes with children', () => {
    const { container } = render(STree, { props: { items, defaultExpanded: ['docs'] } })
    const treeitems = container.querySelectorAll('.s-tree__item')
    expect(container.querySelectorAll('.s-tree__chevron')).toHaveLength(2)
    expect(container.querySelectorAll('.s-tree__spacer')).toHaveLength(2)
    expect(treeitems).toHaveLength(4)
  })

  it('has the tree role', () => {
    render(STree, { props: { items } })
    expect(screen.getByRole('tree')).toBeInTheDocument()
  })

  it('renders a node icon by registry name', () => {
    const withIcon: STreeItem[] = [{ label: 'Favorites', value: 'fav', icon: 'star' }]
    const { container } = render(STree, { props: { items: withIcon } })
    const path = container.querySelector('.s-tree__icon path')
    expect(path).not.toBeNull()
    expect(path?.getAttribute('d')).toBeTruthy()
  })

  it('expands a branch from the keyboard (ArrowRight)', async () => {
    render(STree, { props: { items } })
    const branch = screen.getByRole('treeitem', { name: /Documents/ })
    branch.focus()
    await fireEvent.keyDown(branch, { key: 'ArrowRight' })
    expect(await screen.findByText('Report.pdf')).toBeInTheDocument()
    expect(branch).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses a branch from the keyboard (ArrowLeft)', async () => {
    render(STree, { props: { items, defaultExpanded: ['docs'] } })
    expect(screen.getByText('Report.pdf')).toBeInTheDocument()
    const branch = screen.getByRole('treeitem', { name: /Documents/ })
    branch.focus()
    await fireEvent.keyDown(branch, { key: 'ArrowLeft' })
    await waitFor(() => expect(screen.queryByText('Report.pdf')).toBeNull())
    expect(branch).toHaveAttribute('aria-expanded', 'false')
  })

  it('emits update:modelValue when a leaf is selected', async () => {
    const { emitted } = render(STree, { props: { items, defaultExpanded: ['docs'] } })
    const leaf = screen.getByRole('treeitem', { name: /Report\.pdf/ })
    await fireEvent.click(leaf)
    expect(emitted()['update:modelValue']).toBeTruthy()
  })

  it('does not select a disabled node', async () => {
    const withDisabled: STreeItem[] = [{ label: 'Locked', value: 'locked', disabled: true }]
    const { emitted } = render(STree, { props: { items: withDisabled } })
    const node = screen.getByRole('treeitem', { name: /Locked/ })
    await fireEvent.click(node)
    expect(emitted()['update:modelValue']).toBeUndefined()
  })
})
