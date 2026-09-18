import type { SColorName } from '../../composables/useColorProp'

export type SToggleSize = 'sm' | 'md' | 'lg'

export interface SToggleProps {
  /**
   * Color of the on state: a name from the [palette](/style/palette)
   * (`primary`/`teal`/`teal-10`).
   */
  color?: SColorName
  /**
   * Item value inside `SToggleGroup` (unique within the group). Not set on a standalone toggle.
   */
  value?: string
  /** Size: `sm`, `md` or `lg`. */
  size?: SToggleSize
  /** Square corners: removes the border radius (rounded by default). */
  square?: boolean
  /** Disables the toggle. */
  disabled?: boolean
  /** Accessible name: set it when the toggle content is only an icon. */
  ariaLabel?: string
}
