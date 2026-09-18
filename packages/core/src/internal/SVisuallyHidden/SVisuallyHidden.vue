<script setup lang="ts">
import type { SVisuallyHiddenProps } from './types'

withDefaults(defineProps<SVisuallyHiddenProps>(), { as: 'span' })

defineSlots<{
  /** Content hidden visually but available to screen readers. */
  default?: (props: Record<string, never>) => unknown
}>()
</script>

<template>
  <component
    :is="as"
    class="s-visually-hidden"
  >
    <slot />
  </component>
</template>

<style src="./SVisuallyHidden.scss" lang="scss"></style>
