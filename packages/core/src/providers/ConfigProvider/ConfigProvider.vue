<script setup lang="ts">
import { provideDefaults, provideLocale } from '../../composables'
import type { ConfigProviderProps } from './types'

const props = defineProps<ConfigProviderProps>()

defineSlots<{
  /** App subtree that receives the string dictionary and prop defaults. */
  default?: (props: Record<string, never>) => unknown
}>()

/**
 * Smalt UI configuration provider: passes the library strings dictionary (base locale + partial
 * overrides) and prop defaults down the subtree via provide/inject.
 * Renders only the slot, with no DOM of its own, so typography isolation (reset-inherited) is
 * not needed.
 */
provideLocale(() => ({ locale: props.locale, messages: props.messages }))
provideDefaults(() => props.defaults)
</script>

<template>
  <slot />
</template>
