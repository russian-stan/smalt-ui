import type { SColorName } from '../../composables/useColorProp'

export type STabsOrientation = 'horizontal' | 'vertical'

export interface STabItem {
  /** Tab value (matches the name of its content slot). */
  value: string
  /** Tab label. */
  label: string
  /** Leading icon of the tab: a registry name or a raw SVG path. */
  icon?: string
  /** Disables the tab. */
  disabled?: boolean
}

export interface STabsProps {
  /**
   * Color of the active tab/indicator: a name from the [palette](/style/palette)
   * (`primary`/`teal`/`teal-10`).
   */
  color?: SColorName
  /** List of tabs. Each tab content goes into the slot of the same name (`#<value>`). */
  items?: readonly STabItem[]
  /** Orientation: `horizontal` (default) or `vertical`. */
  orientation?: STabsOrientation
  /** Accessible name of the tab list. */
  ariaLabel?: string
}
