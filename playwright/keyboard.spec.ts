import { expect, test } from '@playwright/test'

/**
 * Keyboard invariants on the built showcase. Synthetic `KeyboardEvent`s do not work here: they
 * bypass the browser's event queue, so a race between the handler and a timer stays invisible.
 * The key press has to be delivered for real, as for a user.
 * */
test.describe('keyboard', () => {
  test('an arrow key in SRadioGroup selects the option, not just moves focus', async ({ page }) => {
    await page.goto('/components/radio')
    const radios = page.getByRole('radio')
    await radios.first().focus()

    // An instant release is the hardest case: keyup arrives before the deferred selection.
    await page.keyboard.press('ArrowDown')

    await expect(radios.nth(1)).toBeFocused()
    await expect(radios.nth(1)).toHaveAttribute('aria-checked', 'true')

    await page.keyboard.press('ArrowUp')
    await expect(radios.first()).toBeFocused()
    await expect(radios.first()).toHaveAttribute('aria-checked', 'true')
    await expect(radios.nth(1)).toHaveAttribute('aria-checked', 'false')
  })

  test('holding the arrow key selects the same option as a quick press', async ({ page }) => {
    await page.goto('/components/radio')
    const radios = page.getByRole('radio')
    await radios.first().focus()

    await page.keyboard.down('ArrowDown')
    await page.waitForTimeout(60)
    await page.keyboard.up('ArrowDown')

    await expect(radios.nth(1)).toBeFocused()
    await expect(radios.nth(1)).toHaveAttribute('aria-checked', 'true')
  })
})
