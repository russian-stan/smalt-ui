import { expect, test } from '@playwright/test'
import { COMPONENT_PAGES } from './pages'

/**
 * Catches hydration warnings, broken icons and missing required props in demos.
 * Under `SMALT_TARGET=dist` (`pnpm test:dist`) it checks the showcase against the built package.
 * */
for (const page of COMPONENT_PAGES) {
  test(`${page.name}: page has no console errors`, async ({ page: browserPage }) => {
    const errors: string[] = []
    browserPage.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    browserPage.on('pageerror', (err) => errors.push(err.message))

    await browserPage.goto(page.path, { waitUntil: 'networkidle' })
    await browserPage.waitForTimeout(300)

    expect(errors, `errors on ${page.path}`).toEqual([])
  })
}
