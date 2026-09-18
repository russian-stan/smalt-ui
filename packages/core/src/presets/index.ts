import type { SPreset } from './types'

export type { SPreset } from './types'

/** Typing helper: `definePreset({ … })` instead of a manual annotation. */
export function definePreset(preset: SPreset): SPreset {
  return preset
}

/**
 * Compact preset: smaller controls for dense interfaces such as admin panels, tables and
 * sidebars. Implemented with prop defaults rather than a separate density prop, so density does
 * not spread across every component's API.
 */
export const compact: SPreset = definePreset({
  name: 'smalt-compact',
  defaults: {
    global: { size: 'sm' },
  },
})

/** Comfortable preset: larger controls for showcase and public-facing pages. */
export const comfortable: SPreset = definePreset({
  name: 'smalt-comfortable',
  defaults: {
    global: { size: 'lg' },
  },
})

/** Built-in presets by name. Used by the Nuxt module, where the option is a string. */
export const BUILTIN_PRESETS = { compact, comfortable } as const

/** Built-in preset name. */
export type SPresetName = keyof typeof BUILTIN_PRESETS
