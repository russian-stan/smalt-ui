<script setup lang="ts">
import { computed } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { useColorProp, useDefaults } from '../../composables'
import type { SProgressProps } from './types'

const props = withDefaults(defineProps<SProgressProps>(), {
  value: null,
  max: 100,
  size: 'md',
  variant: 'primary',
})
const p = useDefaults(props, 'SProgress')

const colorStyle = useColorProp(p, 's-progress')

/**
 * Fill percentage; null means indeterminate mode (styled via data-state).
 * An invalid `max` is not used: Reka falls back to its own values in that case, and a bar
 * computed from our max would diverge from the announced value.
 */
const percent = computed(() => {
  if (p.value == null || !(p.max > 0)) return null
  return Math.min(100, Math.max(0, (p.value / p.max) * 100))
})
</script>

<template>
  <ProgressRoot
    class="s-progress"
    :class="[`s-progress--${p.size}`, `s-progress--${p.variant}`]"
    :style="colorStyle"
    :model-value="p.value"
    :max="p.max"
    :aria-label="p.label"
  >
    <ProgressIndicator
      class="s-progress__indicator"
      :style="percent == null ? undefined : { transform: `translateX(-${100 - percent}%)` }"
    />
  </ProgressRoot>
</template>

<style src="./SProgress.scss" lang="scss"></style>
