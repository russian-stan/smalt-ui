import type { SColorName } from '../../composables/useColorProp'

export type SBadgeVariant = 'neutral' | 'primary' | 'positive' | 'warning' | 'negative'
export type SBadgeSize = 'sm' | 'md' | 'lg'

export interface SBadgeProps {
  /** Color variant: neutral or semantic (primary/positive/warning/negative). */
  variant?: SBadgeVariant
  /**
   * Accent color: a name from the [palette](/style/palette) (`primary`/`teal`/`teal-10`).
   * Overrides the variant color.
   */
  color?: SColorName
  /**
   * Text/icon color on the fill: a name from the [palette](/style/palette). White by default
   * (set it for light `color` values).
   */
  textColor?: SColorName
  /** Size: `sm`, `md` or `lg`. */
  size?: SBadgeSize

  /** Square corners: removes the border radius (rounded by default). */
  square?: boolean
  /** Leading icon: a registry name or a raw SVG path. */
  icon?: string
  /** Trailing icon: a registry name or a raw SVG path. */
  iconRight?: string
}
