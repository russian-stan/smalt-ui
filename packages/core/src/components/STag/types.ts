import type { SBadgeVariant, SBadgeSize } from '../SBadge'
import type { SColorName } from '../../composables/useColorProp'

export interface STagProps {
  /** Color variant: neutral or semantic (primary/positive/warning/negative). */
  variant?: SBadgeVariant
  /**
   * Accent color: a name from the [palette](/style/palette) (`primary`/`teal`/`teal-10`).
   * Overrides the variant color.
   */
  color?: SColorName
  /** Text/icon color on the fill: a name from the [palette](/style/palette). White by default. */
  textColor?: SColorName
  /** Size: `sm`, `md`, or `lg`. */
  size?: SBadgeSize
  /** Square corners: removes the rounding (rounded by default). */
  square?: boolean
  /** Leading icon: a registry name or a raw SVG path. */
  icon?: string
  /** Shows a remove button (a cross). Emits `remove` on click. */
  removable?: boolean
  /** Remove button icon: a registry name or a raw SVG path. */
  removeIcon?: string
  /** Accessible name of the remove button (taken from the locale dictionary by default). */
  removeLabel?: string
}
