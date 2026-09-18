import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SProgress } from '../index'

describe('SProgress · a11y', () => {
  it('has no violations with an accessible name', async () => {
    const { container } = render(SProgress, { props: { value: 60, label: 'Uploading file' } })
    expect(await axe(container)).toHaveNoViolations()
  })
})
