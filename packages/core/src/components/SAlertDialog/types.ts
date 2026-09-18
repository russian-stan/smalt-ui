export interface SAlertDialogProps {
  /** Square corners: removes the rounding (rounded by default). */
  square?: boolean
  /** Title (can be replaced with the `title` slot). */
  title?: string
  /** Explanatory text (can be replaced with the `description` slot). */
  description?: string
  /** Confirm button label. */
  confirmLabel?: string
  /** Cancel button label. */
  cancelLabel?: string
  /** Destructive (irreversible) action: the confirm button uses the `negative` variant. */
  danger?: boolean
}
