import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { ConfigProvider } from '../index'

describe('ConfigProvider · a11y', () => {
  it('renders the slot without violations', async () => {
    const { container } = render({
      components: { ConfigProvider },
      template: `
        <ConfigProvider locale="en">
          <p>Application content</p>
        </ConfigProvider>
      `,
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
