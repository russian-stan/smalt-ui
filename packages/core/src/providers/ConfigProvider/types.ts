import type { SDefaults, SLocale, SMessages } from '../../composables'

export interface ConfigProviderProps {
  /** Built-in base locale for the library strings (`'en'`, the only built-in one). */
  locale?: SLocale
  /** Partial override of individual strings on top of the locale; use it to translate them. */
  messages?: Partial<SMessages>
  /**
   * Prop defaults for the subtree components: the `global` key applies to all, the other keys are
   * component names (`{ global: { size: 'sm' }, SButton: { variant: 'outline' } }`).
   * A prop passed to a component explicitly always wins over a default.
   */
  defaults?: SDefaults
}
