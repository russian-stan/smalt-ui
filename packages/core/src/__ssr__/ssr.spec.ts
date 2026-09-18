/**
 * @vitest-environment node
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createSSRApp, h, type Component } from 'vue'
/**
 * Imported from the `vue/server-renderer` subpath, not `@vue/server-renderer`: the direct
 * dependency resolves to a separate copy of the package, and its `App` types diverge from the
 * ones `createSSRApp` from vue returns.
 */
import { renderToString } from 'vue/server-renderer'
import * as components from '../components'
import * as providers from '../providers'
import { SSR_CASES, SSR_OPEN_CASES, SSR_SKIP } from './cases'

/**
 * Server rendering smoke test. The assertion is deliberately coarse: the test catches
 * window/document access during setup and portals whose structure breaks hydration.
 */
const all: Record<string, Component> = { ...components, ...providers }

/**
 * Vue reports missing required props through console.warn. Without intercepting it, the
 * component renders with `undefined` (empty v-for, missing content) and the smoke test
 * "passes" without checking anything, so warnings count as a failure.
 */
let warnings: string[] = []
let warnSpy: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  warnings = []
  warnSpy = vi.spyOn(console, 'warn').mockImplementation((...args: unknown[]) => {
    warnings.push(args.map(String).join(' '))
  })
})

afterEach(() => {
  warnSpy.mockRestore()
})

describe('SSR · public components', () => {
  for (const [name, component] of Object.entries(all)) {
    const skip = SSR_SKIP[name]
    it.skipIf(Boolean(skip))(`${name} renders on the server`, async () => {
      const app = createSSRApp({
        render: () => (SSR_CASES[name] ? SSR_CASES[name]() : h(component)),
      })
      const html = await renderToString(app)
      expect(typeof html).toBe('string')
      expect(html).not.toContain('[object Object]')
      /**
       * Non-empty markup is an essential part of the smoke test: a component without its
       * required props renders an empty tree, and a "successful" render proves nothing.
       * Such components get a case in SSR_CASES.
       */
      expect(html.trim(), `${name} rendered an empty tree — add a case to SSR_CASES`).not.toBe('')
      expect(warnings, `${name}: Vue warnings during server rendering`).toEqual([])
    })
  }

  it('the skip map is empty or every entry is justified', () => {
    for (const [name, reason] of Object.entries(SSR_SKIP)) {
      expect(reason, `the skip for ${name} must have a reason`).toBeTruthy()
    }
  })
})

describe('SSR · open overlays', () => {
  for (const [name, factory] of Object.entries(SSR_OPEN_CASES)) {
    it(`${name} with open renders on the server`, async () => {
      const app = createSSRApp({ render: factory })
      await expect(renderToString(app)).resolves.toBeTypeOf('string')
    })
  }
})
