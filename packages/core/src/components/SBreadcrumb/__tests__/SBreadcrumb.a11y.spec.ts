import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SBreadcrumb } from '../index'

describe('SBreadcrumb · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(SBreadcrumb, {
      props: {
        items: [
          { label: 'Home', href: '/' },
          { label: 'Catalog', href: '/catalog' },
          { label: 'Product' },
        ],
      },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
