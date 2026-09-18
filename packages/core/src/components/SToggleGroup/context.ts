import type { InjectionKey } from 'vue'

/**
 * Marks "we are inside SToggleGroup". The Reka group context is private, yet SToggle has to know
 * which branch to render: a group item (`ToggleGroupItem` requires the context and throws
 * without it) or a standalone toggle. It lives in a separate module so SToggle does not import
 * SToggleGroup itself and create a cycle.
 */
export const TOGGLE_GROUP_KEY: InjectionKey<true> = Symbol('smalt-toggle-group')
