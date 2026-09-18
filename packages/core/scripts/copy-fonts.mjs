import { cp, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

/**
 * Copies font files into dist, necessarily next to `dist/fonts.css`: that file is built by the
 * bare Sass CLI, and its url() is literal (`./fonts/…`). File names are stable, and the Nuxt
 * module serves the directory with a one-year max-age, so a new font version needs a new name.
 */
const src = fileURLToPath(new URL('../src/fonts', import.meta.url))
const dest = fileURLToPath(new URL('../dist/fonts', import.meta.url))

await rm(dest, { recursive: true, force: true })
await cp(src, dest, { recursive: true })
