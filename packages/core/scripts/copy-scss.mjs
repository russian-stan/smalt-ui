import { cp, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

/**
 * Copies the SCSS sources into dist: consumers need the `$breakpoints` map and the `respond-to`
 * mixin so their own media queries use the same thresholds. CSS variables cannot do this: media
 * queries do not read them, so the threshold has to be substituted at build time.
 * Served as the `@smalt-ui/core/scss/*` subpath, see `exports` in package.json.
 */
const src = fileURLToPath(new URL('../src/styles', import.meta.url))
const dest = fileURLToPath(new URL('../dist/scss', import.meta.url))

await rm(dest, { recursive: true, force: true })
await cp(src, dest, { recursive: true })
