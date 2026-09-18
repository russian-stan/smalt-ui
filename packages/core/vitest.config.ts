import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

/**
 * Two test projects:
 * - unit: happy-dom, fast; also runs the SSR smoke test (those files declare environment: node);
 * - browser: real Chromium via Playwright, for portals, focus, pointer capture, geometry and
 *   computed styles that happy-dom does not provide.
 */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,vue}'],
      exclude: ['src/**/__tests__/**', 'src/**/index.ts'],
    },
    projects: [
      /**
       * Type tests are a separate project: with `projects`, the root `test` block settings are
       * not inherited automatically, and a top-level typecheck would never be picked up
       * (`test:types` would silently run the runtime suite without a single type test).
       */
      {
        extends: true,
        test: {
          name: 'types',
          environment: 'node',
          include: [],
          typecheck: {
            enabled: true,
            only: true,
            checker: 'vue-tsc',
            include: ['src/**/__tests__/**/*.test-d.ts'],
            tsconfig: './tsconfig.vitest.json',
          },
        },
      },
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'happy-dom',
          setupFiles: ['./vitest.setup.ts'],
          include: ['src/**/__tests__/**/*.spec.ts', 'src/__ssr__/*.spec.ts'],
          css: true,
        },
      },
      {
        extends: true,
        test: {
          name: 'browser',
          setupFiles: ['./vitest.setup.browser.ts'],
          include: ['src/**/__tests__/**/*.spec.browser.ts'],
          css: true,
          browser: {
            enabled: true,
            // In Vitest 4 the provider is a factory from @vitest/browser-playwright, not a string.
            provider: playwright(),
            headless: true,
            viewport: { width: 1280, height: 800 },
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
