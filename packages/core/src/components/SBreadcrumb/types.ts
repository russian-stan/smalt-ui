export interface SBreadcrumbItem {
  /** Crumb text. */
  label: string
  /** Crumb link. Usually omitted on the last (current) item. */
  href?: string
  /** Leading icon of the item. */
  icon?: string
}

export interface SBreadcrumbProps {
  /** Path items from the root to the current page; the last one is treated as the current page. */
  items?: readonly SBreadcrumbItem[]
  /** Accessible name of the navigation (`aria-label`; defaults to the locale dictionary). */
  ariaLabel?: string
}
