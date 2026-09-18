import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { render, screen } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import { ToastProvider as RekaToastProvider } from 'reka-ui'
import { useToast } from '../../../composables/useToast'
import { ToastProvider } from '../index'

beforeEach(() => {
  const { toasts, dismiss } = useToast()
  ;[...toasts.value].forEach((t) => dismiss(t.id))
})

describe('ToastProvider', () => {
  it('shows a notification added via useToast', async () => {
    render(ToastProvider)
    const { toast } = useToast()
    toast({ title: 'File uploaded', description: 'Done' })
    expect(await screen.findByText('File uploaded')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('shows several notifications from the queue', async () => {
    render(ToastProvider)
    const { toast } = useToast()
    toast({ title: 'First' })
    toast({ title: 'Second' })
    expect(await screen.findByText('First')).toBeInTheDocument()
    expect(await screen.findByText('Second')).toBeInTheDocument()
  })

  it('renders the slot content', () => {
    render(ToastProvider, { slots: { default: 'Application' } })
    expect(screen.getByText('Application')).toBeInTheDocument()
  })

  it('notifications default to the bottom-right corner', async () => {
    render(ToastProvider)
    // The viewport is teleported to body and appears after mounting, not at render time.
    await nextTick()
    expect(document.querySelector('.s-toast-viewport')).toHaveClass(
      's-toast-viewport--bottom-right',
    )
  })

  it.each(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const)(
    'position %s is set by the prop',
    async (position) => {
      render(ToastProvider, { props: { position } })
      await nextTick()
      expect(document.querySelector('.s-toast-viewport')).toHaveClass(
        `s-toast-viewport--${position}`,
      )
    },
  )

  it.each([
    ['bottom-right', 'right'],
    ['top-right', 'right'],
    ['bottom-left', 'left'],
    ['top-left', 'left'],
  ] as const)('swipe at position %s goes toward its edge: %s', (position, direction) => {
    const wrapper = mount(ToastProvider, { props: { position } })
    expect(wrapper.findComponent(RekaToastProvider).props('swipeDirection')).toBe(direction)
  })

  it('auto-dismiss removes the toast after duration', async () => {
    /**
     * Auto-hide lives here, not in the composable (where `duration` is inert):
     * SToast → Reka ToastRoot :duration → @close → dismiss(id). The test checks the queue
     * directly (more robust against portal timing) and drives the timer with fake timers.
     */
    vi.useFakeTimers()
    try {
      const { toast, toasts } = useToast()
      render(ToastProvider, { props: { duration: 1000 } })
      toast({ title: 'Vanishing', duration: 1000 })
      expect(toasts.value.some((t) => t.title === 'Vanishing')).toBe(true)
      await nextTick()
      await vi.advanceTimersByTimeAsync(1500)
      expect(toasts.value.some((t) => t.title === 'Vanishing')).toBe(false)
    } finally {
      vi.useRealTimers()
    }
  })
})
