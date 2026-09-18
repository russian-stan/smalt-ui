import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SPagination } from '../index'

describe('SPagination · a11y', () => {
  it('has no violations', async () => {
    const { container } = render(SPagination, {
      props: { total: 100, itemsPerPage: 10, page: 3, showEdges: true },
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
