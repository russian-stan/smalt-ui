export type SDrawerSide = 'left' | 'right' | 'top' | 'bottom'

export interface SDrawerProps {
  /** Square corners: removes the rounding (rounded by default). */
  square?: boolean
  /** Side the drawer is attached to. */
  side?: SDrawerSide
  /** Drawer title (can be replaced with the `title` slot). */
  title?: string
  /** Description below the title (can be replaced with the `description` slot). */
  description?: string
  /** Accessible name of the close button (taken from the locale dictionary by default). */
  closeLabel?: string
}
