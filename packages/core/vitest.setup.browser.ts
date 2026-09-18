import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/vue'
import '@testing-library/jest-dom/vitest'
import * as axeMatchers from 'vitest-axe/matchers'
import type { AxeMatchers } from 'vitest-axe'

/**
 * The full library styles are needed: browser tests check what happy-dom lacks, such as focus
 * rings, clip-path, transform and real geometry.
 */
import './src/styles/index.scss'

expect.extend(axeMatchers)

afterEach(() => cleanup())

/**
 * There are intentionally no ResizeObserver or pointer capture polyfills here: a real browser has
 * the real ones, which is exactly why the browser project catches what happy-dom misses.
 */

/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
declare module 'vitest' {
  interface Assertion<T = any> extends AxeMatchers {}
}
