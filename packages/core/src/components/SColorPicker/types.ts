import type { SElevation } from '../../composables/useElevationProp'

export interface SColorPickerProps {
  /** Square field corners: removes the rounding (rounded by default). */
  square?: boolean
  /** Label next to the color preview (in the trigger). */
  label?: string
  /** Shows the opacity slider (alpha channel). */
  withAlpha?: boolean
  /** Preset swatches for quick selection (an array of hex strings). */
  swatches?: string[]
  /** Hides the hex input in the panel. */
  hideInput?: boolean
  /** Disables color selection. */
  disabled?: boolean
  /** Accessible name of the trigger (`aria-label`). */
  ariaLabel?: string
  /** Accessible name of the swatch group (taken from the locale dictionary by default). */
  swatchesLabel?: string
  /** Removes the shadow. Overridden by the `elevation` prop when it is set. */
  flat?: boolean
  /** Shadow level 0–5 ([scale](/style/elevation)); `0` means no shadow. Overrides `flat`. */
  elevation?: SElevation
}
