import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { ToastProvider, ToastViewport } from 'reka-ui'
import { axe } from 'vitest-axe'
import { SToast } from '../index'

describe('SToast · a11y', () => {
  it('has no violations', async () => {
    render({
      components: { ToastProvider, ToastViewport, SToast },
      template: `
        <ToastProvider>
          <SToast title="File uploaded" description="Added to the project" variant="positive" />
          <ToastViewport />
        </ToastProvider>
      `,
    })
    await screen.findByText('File uploaded')
    /**
     * ToastViewport adds focus guards (aria-hidden + tabindex), a Reka artifact;
     * check the subtree of the toast itself.
     */
    const toast = document.querySelector('.s-toast') as HTMLElement
    expect(await axe(toast)).toHaveNoViolations()
  })
})
