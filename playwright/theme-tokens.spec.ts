import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { expect, test } from '@playwright/test'

// Reads dist/styles.css: requires a build of @smalt-ui/core (test:visual runs it).
const styles = readFileSync(
  fileURLToPath(new URL('../packages/core/dist/styles.css', import.meta.url)),
  'utf8',
)

function html(theme: 'light' | 'dark'): string {
  return `<!doctype html>
<html data-theme="${theme}">
<head><meta charset="utf-8"><style>${styles}</style></head>
<body style="margin:0;padding:24px;background:var(--s-color-bg)">
  <button style="font-family:var(--s-font-sans);background:var(--s-color-primary);color:var(--s-color-primary-contrast);padding:var(--s-space-2) var(--s-space-4);border:none;border-radius:var(--s-radius-md);font-size:var(--s-font-size-sm);font-weight:var(--s-font-weight-medium)">Button</button>
</body></html>`
}

for (const theme of ['light', 'dark'] as const) {
  test(`design tokens — ${theme} theme`, async ({ page }) => {
    await page.setContent(html(theme))
    await expect(page.locator('button')).toHaveScreenshot(`button-${theme}.png`)
  })
}
