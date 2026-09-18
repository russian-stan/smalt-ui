<script setup lang="ts">
import type { SLabelProps } from './types'

const props = withDefaults(defineProps<SLabelProps>(), {
  required: false,
  disabled: false,
  size: 'md',
})

defineSlots<{
  /** Label text. */
  default?: (props: Record<string, never>) => unknown
}>()
</script>

<template>
  <label
    class="s-label"
    :class="[`s-label--${size}`, { 's-label--disabled': disabled }]"
    :for="props.for"
  >
    <slot />
    <span
      v-if="required"
      class="s-label__required"
      aria-hidden="true"
      >*</span
    >
  </label>
</template>

<style src="./SLabel.scss" lang="scss"></style>
