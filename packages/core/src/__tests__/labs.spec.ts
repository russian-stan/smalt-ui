import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { createSUI } from '../plugin'
import { LABS_COMPONENTS } from '../labs'
import * as labsModule from '../labs'

// Empty host: the test checks the app component registry, not the markup.
const Host = { render: () => null }

const labsNames = Object.keys(LABS_COMPONENTS)

describe('labs channel', () => {
  /**
   * While the channel is empty, the loops below run no assertions — this is stated explicitly
   * so that green tests do not create an illusion of coverage.
   */
  it('the channel is set up in advance and currently empty', () => {
    expect(labsNames).toEqual([])
  })

  it('the plugin registers labs from an explicit registry, not a namespace import', () => {
    /**
     * The bundler turns `import * as labs` of an empty module into an internal object, and the
     * plugin would register it as a component with a technical name — visible only in dist.
     */
    const app = createApp(Host)
    app.use(createSUI({ labs: true }))
    for (const name of Object.keys(labsModule)) {
      if (name === 'LABS_COMPONENTS') continue
      expect(
        app.component(name),
        `${name} must not end up in the component registry`,
      ).toBeUndefined()
    }
    expect(app.component('labs_exports')).toBeUndefined()
  })

  it.skipIf(labsNames.length === 0)(
    'without the labs option experimental components are not registered',
    () => {
      const app = createApp(Host)
      app.use(createSUI())
      for (const name of labsNames) {
        expect(app.component(name), `${name} must not be registered`).toBeUndefined()
      }
    },
  )

  it.skipIf(labsNames.length === 0)(
    'with the labs option all experimental components are registered',
    () => {
      const app = createApp(Host)
      app.use(createSUI({ labs: true }))
      for (const name of labsNames) {
        expect(app.component(name), `${name} must be registered`).toBeDefined()
      }
    },
  )

  it.skipIf(labsNames.length === 0)(
    'labs are not re-exported from the main entry point',
    async () => {
      const root = await import('../index')
      for (const name of labsNames) {
        expect(root, `${name} must not be in @smalt-ui/core`).not.toHaveProperty(name)
      }
    },
  )
})
