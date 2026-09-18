import type { SElevation } from '../../composables/useElevationProp'

export type STooltipSide = 'top' | 'right' | 'bottom' | 'left'

export type STooltipTrigger = 'hover' | 'click' | 'auto'

export interface STooltipProps {
  /** Square corners: removes the rounding (rounded by default). */
  square?: boolean
  /** Tooltip text (can be replaced with the default slot). */
  content?: string
  /** Side of the trigger the tooltip appears on. */
  side?: STooltipSide
  /**
   * How the tooltip opens: `hover` on hover and focus; `click` on a trigger press, a second
   * press closes it; `auto` uses hover for mouse and keyboard and a tap for touch.
   */
  trigger?: STooltipTrigger
  /** Delay before showing, in ms. Applies only when opening on hover. */
  delayDuration?: number
  /**
   * After how many ms a tooltip opened by a press closes on its own. `0` keeps it open until
   * another press, a press outside, Escape, or scrolling.
   */
  autoCloseDelay?: number
  /** Removes the shadow. Overridden by the `elevation` prop when it is set. */
  flat?: boolean
  /** Shadow level 0–5 ([scale](/style/elevation)); `0` means no shadow. Overrides `flat`. */
  elevation?: SElevation
}
