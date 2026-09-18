import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { ToastProvider, ToastViewport } from 'reka-ui'
import { SToast } from '../index'

// SToast works only inside ToastProvider.
function mountToast(props: Record<string, unknown>, onClose = vi.fn()) {
  const result = render({
    components: { ToastProvider, ToastViewport, SToast },
    setup: () => ({ props, onClose }),
    template: `<ToastProvider><SToast v-bind="props" @close="onClose" /><ToastViewport /></ToastProvider>`,
  })
  return { ...result, onClose }
}

describe('SToast', () => {
  it('renders the title and description', async () => {
    mountToast({ title: 'Saved', description: 'Changes applied' })
    expect(await screen.findByText('Saved')).toBeInTheDocument()
    expect(screen.getByText('Changes applied')).toBeInTheDocument()
  })

  it('applies the variant class', async () => {
    const { container } = mountToast({ title: 'Error', variant: 'negative' })
    await screen.findByText('Error')
    expect(container.querySelector('.s-toast')).toHaveClass('s-toast--negative')
  })

  it('emits close when the close button is clicked', async () => {
    const { onClose } = mountToast({ title: 'Notification' })
    await screen.findByText('Notification')
    await fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })

  it('renders the variant status icon', async () => {
    const { container } = mountToast({ title: 'Done', variant: 'positive' })
    await screen.findByText('Done')
    expect(container.querySelector('.s-toast__icon.s-icon')).not.toBeNull()
  })
})
