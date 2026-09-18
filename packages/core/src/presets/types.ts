import type { SDefaults, ThemeTokens } from '../composables'

/**
 * A preset is a named "theme + prop defaults" set: everything that sets a product apart from the
 * library defaults, in one object. Tokens are applied as a custom theme (createTheme), defaults as
 * prop configuration.
 */
export interface SPreset {
  /** Preset name, used as the id of the custom theme style tag. */
  name: string
  /** Token overrides (brand keys and individual semantic tokens). */
  tokens?: ThemeTokens
  /** Prop defaults (the `global` key and component names). */
  defaults?: SDefaults
}
