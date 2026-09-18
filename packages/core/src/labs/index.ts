import type { Component } from 'vue'

/**
 * Experimental components channel (see `./README.md`); it exists while empty so that filling it is
 * not a breaking change. An explicit registry, not `import * as`: the bundler turns an empty module
 * into a namespace object that `createSUI({ labs: true })` would register (visible only in dist).
 */
export const LABS_COMPONENTS: Record<string, Component> = {}
