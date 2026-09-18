import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { SAccordion } from '../../SAccordion'
import { SAccordionItem } from '../index'

describe('SAccordionItem · a11y', () => {
  it('has no violations inside SAccordion', async () => {
    const { container } = render({
      components: { SAccordion, SAccordionItem },
      template: `
        <SAccordion :model-value="'x'">
          <SAccordionItem value="x" title="Section">Section content</SAccordionItem>
        </SAccordion>
      `,
    })
    expect(await axe(container)).toHaveNoViolations()
  })
})
