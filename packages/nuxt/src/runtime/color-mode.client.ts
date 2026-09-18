import { useColorMode } from '@smalt-ui/core'
import { defineNuxtPlugin } from '#app'

// Before hydration the module's inline script sets data-theme; after that useColorMode syncs it.
export default defineNuxtPlugin(() => {
  useColorMode()
})
