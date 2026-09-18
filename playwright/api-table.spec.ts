import { expect, test } from '@playwright/test'

/**
 * `vue-component-meta` returns an event type as a tuple of handler parameters: `[value: boolean]`,
 * and an event without arguments as `[]`. In the "Signature" column that reads as an array, an
 * empty one at that, which is the opposite of the meaning. The table must show the argument list.
 * */
test.describe('API table', () => {
  test('an event without arguments shows a handler without parameters, not an empty array', async ({
    page,
  }) => {
    await page.goto('/components/toast')
    const signature = page
      .locator('h3:has-text("Events") + .api__scroll tbody tr', { hasText: 'close' })
      .locator('td')
      .nth(1)

    await expect(signature).toHaveText('() => void')
  })

  test('the event description comes from JSDoc instead of staying empty', async ({ page }) => {
    await page.goto('/components/toast')
    const description = page
      .locator('h3:has-text("Events") + .api__scroll tbody tr', { hasText: 'close' })
      .locator('td')
      .nth(2)

    await expect(description).toHaveText('The toast closed (by timer, swipe or button).')
  })

  test('an event with an argument shows the full handler signature', async ({ page }) => {
    await page.goto('/components/dialog')
    const signature = page
      .locator('h3:has-text("Events") + .api__scroll tbody tr', { hasText: 'update:open' })
      .locator('td')
      .nth(1)

    await expect(signature).toHaveText('(value: boolean | undefined) => void')
  })
})
