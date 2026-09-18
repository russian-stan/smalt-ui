export interface SAccordionItemProps {
  /** Unique item value within `SAccordion` (used to control expansion). */
  value: string
  /** Item title (alternative to the `title` slot). */
  title?: string
  /** Disables the item: it cannot be expanded or collapsed. */
  disabled?: boolean
  /** Expand indicator icon. */
  expandIcon?: string
}
