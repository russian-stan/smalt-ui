export type SSeparatorOrientation = 'horizontal' | 'vertical'

export interface SSeparatorProps {
  /**
   * Line orientation: `horizontal` spans the full width, `vertical` the full height of the
   * container.
   */
  orientation?: SSeparatorOrientation
  /**
   * When `true`, the separator is purely decorative and hidden from screen readers
   * (`role="none"`).
   */
  decorative?: boolean
  /** Label text in the center of a horizontal separator (alternative to the default slot). */
  label?: string
}
