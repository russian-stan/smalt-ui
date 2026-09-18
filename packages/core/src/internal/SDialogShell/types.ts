export interface SDialogShellProps {
  /** BEM prefix: root elements get classes like `s-${name}__overlay/__content/…`. */
  name: string
  /** Visually hidden label (accessible name) when there is no visible title. */
  label: string
  /** Visible title (can be replaced with the `title` slot). */
  title?: string
  /** Description (can be replaced with the `description` slot). */
  description?: string
  /** Accessible name of the close button (defaults to the locale dictionary). */
  closeLabel?: string
  /** Side modifier for the content: class `s-${name}__content--${side}`. */
  side?: string
  /** Square corners: adds the `s-${name}__content--square` modifier. */
  square?: boolean
}
