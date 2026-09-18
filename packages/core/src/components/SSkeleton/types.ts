export type SSkeletonVariant = 'text' | 'rect' | 'circle'

export interface SSkeletonProps {
  /**
   * Placeholder shape: a line of text (`text`), a rectangle (`rect`) or a circle (`circle`,
   * e.g. for an avatar).
   */
  variant?: SSkeletonVariant
  /** Width: a number is treated as pixels, a string as a CSS value (`'100%'`, `'12rem'`). */
  width?: string | number
  /**
   * Height: a number is treated as pixels, a string as a CSS value. `text`/`circle` have a
   * sensible default.
   */
  height?: string | number
  /**
   * Enables the shimmer animation. Turn it off for a static skeleton or for
   * `prefers-reduced-motion`.
   */
  animated?: boolean
}
