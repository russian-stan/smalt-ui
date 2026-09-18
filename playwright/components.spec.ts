import { expect, test } from '@playwright/test'
import { COMPONENT_PAGES } from './pages'

for (const theme of ['light', 'dark'] as const) {
  for (const p of COMPONENT_PAGES) {
    test(`${p.name} — ${theme}`, async ({ page }) => {
      // Emulate the system theme → VitePress + Layout set data-theme.
      await page.emulateMedia({ colorScheme: theme })
      await page.goto(p.path, { waitUntil: 'networkidle' })

      const demo = page.locator('.demo__preview').first()
      await demo.waitFor({ state: 'visible' })
      /**
       * Wait for fonts separately: with `font-display: swap` the face swap is not tied to
       * network idle, so the snapshot would catch either the fallback or the web font.
       * */
      await page.evaluate(() => document.fonts.ready)
      await expect(demo).toHaveScreenshot(`${p.name}-${theme}.png`)
    })
  }
}
