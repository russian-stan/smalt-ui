/**
 * @vitest-environment node
 */
import { describe, expect, it, vi } from 'vitest'

/**
 * Module singletons and SSR: in Node a module outlives requests, so state written while
 * rendering one page would leak into the markup of the next (cross-request state pollution).
 * The tests check that no state accumulates on the server.
 */
describe('SSR · composable state', () => {
  it('the toast queue does not fill on the server', async () => {
    vi.resetModules()
    const { useToast } = await import('../composables/useToast')
    const { toast, toasts } = useToast()

    toast({ title: 'Server toast' })

    expect(toasts.value).toHaveLength(0)
  })

  it('useColorMode on the server does not reuse state between calls', async () => {
    vi.resetModules()
    const { useColorMode } = await import('../composables/useColorMode')

    const first = useColorMode()
    first.setMode('dark')
    const second = useColorMode()

    expect(second).not.toBe(first)
    expect(second.mode.value).toBe('auto')
  })

  it('useColorMode on the server returns the light scheme and leaves the DOM alone', async () => {
    vi.resetModules()
    const { useColorMode } = await import('../composables/useColorMode')

    expect(useColorMode().scheme.value).toBe('light')
  })
})
