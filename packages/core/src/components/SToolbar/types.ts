import type { SElevation } from '../../composables/useElevationProp'

export type SToolbarOrientation = 'horizontal' | 'vertical'

export interface SToolbarProps {
  /**
   * Toolbar orientation. It sets the layout and the direction of arrow key navigation.
   * @defaultValue 'horizontal'
   */
  orientation?: SToolbarOrientation
  /** Square corners: removes the border radius (rounded by default). */
  square?: boolean
  /**
   * Loops arrow key navigation (from the last item to the first and back).
   * @defaultValue true
   */
  loop?: boolean
  /** Accessible name of the toolbar (for screen readers). */
  ariaLabel?: string
  /** Removes the shadow. Overridden by the `elevation` prop when it is set. */
  flat?: boolean
  /** Shadow level 0–5 ([scale](/style/elevation)); `0` means no shadow. Overrides `flat`. */
  elevation?: SElevation
}
