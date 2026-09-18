export interface SCollapsibleProps {
  /** Trigger title (an alternative to the `trigger` slot). */
  title?: string
  /** Square corners: removes the border radius (rounded by default). */
  square?: boolean
  /** Prevents expanding and disables the trigger. */
  disabled?: boolean
  /** Icon of the expand indicator. */
  expandIcon?: string
}
