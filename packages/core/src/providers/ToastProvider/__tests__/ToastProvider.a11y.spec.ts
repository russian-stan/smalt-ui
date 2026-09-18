import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import { useToast } from '../../../composables/useToast'
import { ToastProvider } from '../index'

beforeEach(() => {
  const { toasts, dismiss } = useToast()
  ;[...toasts.value].forEach((t) => dismiss(t.id))
})

describe('ToastProvider · a11y', () => {
  it('no violations with an active notification', async () => {
    render(ToastProvider)
    const { toast } = useToast()
    toast({ title: 'Done', description: 'Operation completed', variant: 'positive' })
    await screen.findByText('Done')
    /**
     * ToastViewport adds focus guards (aria-hidden + tabindex), a Reka artifact; the test
     * checks the notification's own subtree.
     */
    const toastEl = document.querySelector('.s-toast') as HTMLElement
    expect(await axe(toastEl)).toHaveNoViolations()
  })
})
