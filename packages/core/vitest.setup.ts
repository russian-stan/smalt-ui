import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/vue'
import '@testing-library/jest-dom/vitest'
import * as axeMatchers from 'vitest-axe/matchers'
import type { AxeMatchers } from 'vitest-axe'

expect.extend(axeMatchers)

// globals are off, so cleanup is registered by hand.
afterEach(() => cleanup())

// Environment polyfills for reka-ui (happy-dom does not implement the whole DOM API).
if (!('ResizeObserver' in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}
if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView ??= () => {}
  Element.prototype.hasPointerCapture ??= () => false
  Element.prototype.setPointerCapture ??= () => {}
  Element.prototype.releasePointerCapture ??= () => {}
}

/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
declare module 'vitest' {
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
