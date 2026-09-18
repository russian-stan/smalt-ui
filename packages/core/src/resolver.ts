import { COMPONENT_NAMES, EXPLICIT_ONLY_PROVIDERS, PROVIDER_NAMES } from './component-names'

export interface SUIResolverOptions {
  /** Component name prefix in templates. Defaults to `''` (e.g. `SButton`). */
  prefix?: string
}

interface ResolvedComponent {
  name: string
  from: string
}

interface ComponentResolver {
  type: 'component'
  resolve: (name: string) => ResolvedComponent | undefined
}

/**
 * Resolver for unplugin-vue-components: auto-imports Smalt UI components in plain Vite/Vue
 * projects, the same DX the Nuxt module gives in Nuxt.
 * Component styles are injected into their chunks at build time and need no separate import;
 * the consumer includes the global `@smalt-ui/core/styles.css` once.
 */
export function SUIResolver(options: SUIResolverOptions = {}): ComponentResolver {
  const prefix = options.prefix ?? ''
  const explicitOnly = new Set<string>(EXPLICIT_ONLY_PROVIDERS)
  const known = new Set<string>([
    ...COMPONENT_NAMES,
    ...PROVIDER_NAMES.filter((name) => !explicitOnly.has(name)),
  ])

  /**
   * unplugin-vue-components passes the template name to the resolver already in PascalCase, so the
   * prefix is compared case-insensitively: `prefix: 'app'` in the config and `AppSButton` in the
   * markup must match, otherwise auto-import silently stops working.
   */
  const prefixLower = prefix.toLowerCase()

  return {
    type: 'component',
    resolve(name: string) {
      if (prefix && name.slice(0, prefix.length).toLowerCase() !== prefixLower) return undefined
      const bare = name.slice(prefix.length)
      if (!known.has(bare)) return undefined
      return { name: bare, from: '@smalt-ui/core' }
    },
  }
}
