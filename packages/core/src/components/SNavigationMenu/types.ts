import type { SElevation } from '../../composables/useElevationProp'

export interface SNavigationMenuLink {
  /** Link title. */
  label: string
  /** Link URL. */
  href: string
  /** Optional description below the title. */
  description?: string
}

export interface SNavigationMenuItem {
  /** Item label in the navigation bar. */
  label: string
  /** URL, when the item is a direct link (no dropdown panel). */
  href?: string
  /** Nested links, when the item opens a panel. */
  links?: SNavigationMenuLink[]
}

export interface SNavigationMenuProps {
  /** Navigation items: a direct link (`href`) or an expandable panel (`links`). */
  items?: readonly SNavigationMenuItem[]
  /** Accessible name of the navigation (`aria-label`). */
  ariaLabel?: string
  /** Square corners: removes the rounding of the dropdown panel. */
  square?: boolean
  /** Removes the shadow. Overridden by the `elevation` prop when it is set. */
  flat?: boolean
  /** Shadow level 0–5 ([scale](/style/elevation)); `0` means no shadow. Overrides `flat`. */
  elevation?: SElevation
}
