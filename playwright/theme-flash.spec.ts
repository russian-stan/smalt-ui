import { expect, test } from '@playwright/test'

/**
 * Until `data-theme` is set, the tokens follow the system theme (the media fallback in
 * `_semantic.scss`). So the user's choice must apply before the first paint, from an inline script
 * in `<head>`, not after the bundle loads. External `*.js` is blocked here: what remains is exactly
 * what the user sees at first.
 * */
test.describe('theme before first paint', () => {
  for (const [choice, expected] of [
    ['light', '#ffffff'],
    ['dark', '#0a0a0a'],
  ] as const) {
    test(`choice "${choice}" applies before the bundle runs, with the opposite system theme`, async ({
      browser,
    }) => {
      const context = await browser.newContext({
        colorScheme: choice === 'light' ? 'dark' : 'light',
      })
      const page = await context.newPage()
      await page.addInitScript(
        (value) => localStorage.setItem('vitepress-theme-appearance', value),
        choice,
      )
      await page.route('**/*.js', (route) => route.abort())

      await page.goto('/components/button', { waitUntil: 'domcontentloaded' })

      await expect(page.locator('html')).toHaveAttribute('data-theme', choice)
      const bg = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--s-color-bg').trim(),
      )
      expect(bg).toBe(expected)
      await context.close()
    })
  }
})
