export type SAvatarSize = 'sm' | 'md' | 'lg'

export interface SAvatarProps {
  /** Image URL. If it fails to load, the fallback is shown. */
  src?: string
  /** Alternative text of the image. */
  alt?: string
  /** Fallback content (usually initials) shown when there is no image. */
  fallback?: string
  /** Size: `sm`/`md`/`lg`. */
  size?: SAvatarSize
  /** Delay before showing the fallback, ms (avoids flicker when the image loads fast). */
  delayMs?: number
}
