import type { ColorMode } from './composables/useColorMode'

/** Key under which `useColorMode` stores the user's choice. */
export const COLOR_MODE_STORAGE_KEY = 'smalt-color-mode'

export interface ColorModeScriptOptions {
  /** localStorage key. Defaults to `'smalt-color-mode'`, the same as `useColorMode`. */
  storageKey?: string
  /** Mode when storage is empty. Defaults to `'auto'`. */
  initialMode?: ColorMode
}

/**
 * Code that sets `data-theme` on `<html>` **before the first paint**. The string is inlined into
 * `<head>` before the styles: without it the page is painted by `prefers-color-scheme` until the
 * bundle runs, and the user's choice shows up as a flash. The Nuxt module inserts the script
 * itself; other setups do it by hand, see [Theming](/theming#theme-before-first-paint).
 */
export function colorModeScript(options: ColorModeScriptOptions = {}): string {
  const storageKey = options.storageKey ?? COLOR_MODE_STORAGE_KEY
  const initialMode = options.initialMode ?? 'auto'
  // `<` is escaped: otherwise a key like `</script>` would close the inline tag and break out.
  const literal = (value: string) => JSON.stringify(value).replace(/</g, '\\u003c')
  return (
    `(function(){try{` +
    `var m=localStorage.getItem(${literal(storageKey)})||${literal(initialMode)};` +
    `var d=m==='dark'||(m!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);` +
    `document.documentElement.setAttribute('data-theme',d?'dark':'light');` +
    `}catch(e){}})();`
  )
}
