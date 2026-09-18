import type { App, Component, Plugin } from 'vue'
import * as components from './components'
import * as providers from './providers'
import { LABS_COMPONENTS } from './labs'
import { EXPLICIT_ONLY_PROVIDERS } from './component-names'
import {
  createTheme,
  injectTheme,
  installDefaults,
  mergeDefaults,
  type SDefaults,
  type ThemeTokens,
} from './composables'
import type { SPreset } from './presets'

/**
 * Providers with an "explicit import only" policy are NOT registered globally (consumers import
 * them). Other providers (e.g. ToastProvider) are registered like regular components and placed in
 * the template. The list comes from the generated component-names.ts, the source shared with the
 * resolver and the Nuxt module, so the policy does not drift between copies.
 */
const EXPLICIT_ONLY = new Set<string>(EXPLICIT_ONLY_PROVIDERS)

export interface SUIOptions {
  /** Name prefix for global registration. Defaults to `''` (e.g. `SButton`). */
  prefix?: string
  /**
   * Register the experimental components from `@smalt-ui/core/labs`. Defaults to `false`: their
   * API can change without a deprecation cycle, so enabling them is a deliberate choice.
   */
  labs?: boolean
  /**
   * App-level prop defaults: `{ global: { size: 'sm' }, SButton: { variant: 'outline' } }`.
   * An alternative to `ConfigProvider` without a wrapper in the template.
   */
  defaults?: SDefaults
  /**
   * Preset: "theme + defaults" in one object (`compact`, `comfortable` or a custom one via
   * `definePreset`). Explicit `defaults` are merged over the preset.
   */
  preset?: SPreset
  /**
   * Targeted theme token overrides (brand keys, semantic roles, fonts).
   * Merged OVER `preset.tokens`, just as `defaults` goes over `preset.defaults`.
   */
  theme?: ThemeTokens
}

/** Create a Vue plugin that registers all components globally. */
export function createSUI(options: SUIOptions = {}): Plugin {
  const prefix = options.prefix ?? ''
  return {
    install(app: App) {
      const tokens = { ...options.preset?.tokens, ...options.theme }
      if (Object.keys(tokens).length > 0) {
        injectTheme(createTheme(tokens), options.preset?.name ?? 'smalt-theme')
      }
      const defaults: SDefaults = mergeDefaults(options.preset?.defaults, options.defaults)
      if (Object.keys(defaults).length > 0) installDefaults(app, defaults)
      for (const [name, component] of Object.entries(components as Record<string, Component>)) {
        app.component(`${prefix}${name}`, component)
      }
      for (const [name, component] of Object.entries(providers as Record<string, Component>)) {
        if (EXPLICIT_ONLY.has(name)) continue
        app.component(`${prefix}${name}`, component)
      }
      if (options.labs) {
        for (const [name, component] of Object.entries(LABS_COMPONENTS)) {
          app.component(`${prefix}${name}`, component)
        }
      }
    },
  }
}

/** Ready-made plugin with default settings: `app.use(SUI)`. */
export const SUI: Plugin = createSUI()
