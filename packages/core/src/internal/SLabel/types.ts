export type SLabelSize = 'sm' | 'md' | 'lg'

export interface SLabelProps {
  /** id of the associated element (native `for` attribute). */
  for?: string
  /** Show the required marker (`*`) after the text. */
  required?: boolean
  /** Muted look for a disabled field. */
  disabled?: boolean
  /** Label text size: `sm`/`md`/`lg`. */
  size?: SLabelSize
}
