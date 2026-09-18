import type { SColorName } from '../../composables/useColorProp'

export type SSpinnerSize = 'sm' | 'md' | 'lg'
export type SSpinnerVariant = 'primary' | 'neutral' | 'current'

export interface SSpinnerProps {
  /** Size: `sm`, `md`, or `lg`. */
  size?: SSpinnerSize
  /** Color: accent (`primary`), neutral (`neutral`), or inherited (`current`). */
  variant?: SSpinnerVariant
  /**
   * Accent color: a name from the [palette](/style/palette) (`primary`/`teal`/`teal-10`).
   * Overrides `variant`.
   */
  color?: SColorName
  /** Accessible name for screen readers (otherwise the spinner is decorative). */
  label?: string
}
