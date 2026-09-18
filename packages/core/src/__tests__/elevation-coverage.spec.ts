import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Shadow is a configurable property: a component that draws one must expose the
 * `flat`/`elevation` props, otherwise the consumer has to reach into the library's CSS classes.
 * The match is checked both ways: props on a component without a shadow lie in the API table.
 */
const root = resolve(process.cwd(), 'src')

/**
 * A component draws a shadow if it references a non-zero level token or includes the surface
 * mixin. The token is searched across all styles, not only in `box-shadow` itself: the level may
 * be set through an intermediate variable (that is how the card's layered shadow is built).
 */
const DRAWS_SHADOW = /--s-elevation-[1-5]|@include tools\.floating-surface/

/**
 * A shadow without props, on purpose. Modals: the shadow separates the window from the dimmed
 * backdrop, there is nothing to turn off. Slider: the thumb shadow is part of its physical
 * metaphor, not surface styling. (`SColorPicker` does have the props — they go to its popover
 * panel, while the thumb shadows stay for the same reason as the slider's.)
 */
const WITHOUT_PROPS = new Set(['SDialog', 'SAlertDialog', 'SDrawer', 'SSlider'])

const components = readdirSync(`${root}/components`, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

/** Component styles: its own file plus the internal subcomponents in the same folder. */
function styles(name: string): string {
  const dir = `${root}/components/${name}`
  return readdirSync(dir)
    .filter((file) => file.endsWith('.scss'))
    .map((file) => readFileSync(`${dir}/${file}`, 'utf8'))
    .join('\n')
}

function props(name: string): string {
  const path = `${root}/components/${name}/types.ts`
  return existsSync(path) ? readFileSync(path, 'utf8') : ''
}

describe('shadow prop coverage', () => {
  const withShadow = components.filter((name) => DRAWS_SHADOW.test(styles(name)))

  it('finds components with a shadow', () => {
    expect(withShadow.length).toBeGreaterThan(10)
  })

  for (const name of components) {
    const drawsShadow = withShadow.includes(name)
    const hasProps = /elevation\?: SElevation/.test(props(name))

    if (drawsShadow && WITHOUT_PROPS.has(name)) continue

    if (drawsShadow) {
      it(`${name} draws a shadow and exposes the flat/elevation props`, () => {
        expect(props(name), `${name}: has a shadow but no elevation prop`).toMatch(
          /elevation\?: SElevation/,
        )
        expect(props(name), `${name}: has a shadow but no flat prop`).toMatch(/flat\?: boolean/)
      })
    } else if (hasProps) {
      it(`${name} declares shadow props, so it must draw a shadow`, () => {
        expect(styles(name), `${name}: has shadow props but no shadow`).toMatch(DRAWS_SHADOW)
      })
    }
  }

  it('toggles and navigation have no shadow', () => {
    for (const name of ['SCheckbox', 'SRadio', 'SRadioGroup', 'SRating', 'SBreadcrumb']) {
      expect(styles(name), `${name} must not draw a shadow`).not.toMatch(DRAWS_SHADOW)
      expect(props(name), `${name} must not declare shadow props`).not.toMatch(/flat\?: boolean/)
    }
  })
})
