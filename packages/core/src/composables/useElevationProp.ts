import { computed, type ComputedRef } from 'vue'

/** Shadow level on the Material Design scale: `0` is no shadow, `5` is the highest elevation. */
export type SElevation = 0 | 1 | 2 | 3 | 4 | 5

/** Shadow props, implemented by components that draw a shadow. */
export interface ElevationProps {
  /** Removes the shadow. Overridden by the `elevation` prop when it is set. */
  flat?: boolean
  /** Shadow level 0–5 ([scale](/style/elevation)); `0` means no shadow. Overrides `flat`. */
  elevation?: SElevation
}

/** Emission options for components whose shadow differs between states. */
export interface ElevationOptions {
  /** Emit the hover step `--<name>-elevation-hover`: level +1, capped at 5. */
  hover?: boolean
  /**
   * The "no shadow" value, `none` by default. Where the shadow is part of a list (the card's
   * selection ring), `none` invalidates the whole declaration and kills the adjacent layer; such
   * places need a transparent shadow like `0 0 #0000`.
   */
  zero?: string
}

/**
 * Style variables `--<name>-elevation` for the `flat`/`elevation` props (`name` is e.g. `s-card`).
 * `elevation` overrides `flat`: `flat` usually comes from global defaults, and otherwise there
 * would be no way to bring the shadow back for a single instance. The level resolves to the
 * `var(--s-elevation-N)` token so the shadow stays themeable via `createTheme`.
 */
export function useElevationProp(
  props: ElevationProps,
  name: string,
  options: ElevationOptions = {},
): ComputedRef<Record<string, string> | undefined> {
  const { hover = false, zero = 'none' } = options
  const shadow = (level: number) => (level === 0 ? zero : `var(--s-elevation-${level})`)

  return computed(() => {
    const { flat, elevation } = props
    if (elevation === undefined && !flat) return undefined

    // A static attribute (elevation="2") arrives as a string: Vue only casts Boolean props.
    const level = elevation === undefined ? 0 : Number(elevation)
    const style: Record<string, string> = { [`--${name}-elevation`]: shadow(level) }
    // A zero shadow does not rise: a flat component stays flat on hover.
    if (hover) style[`--${name}-elevation-hover`] = shadow(level === 0 ? 0 : Math.min(level + 1, 5))
    return style
  })
}
