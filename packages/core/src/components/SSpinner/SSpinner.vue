<script setup lang="ts">
import { useColorProp, useDefaults } from '../../composables'
import type { SSpinnerProps } from './types'

const props = withDefaults(defineProps<SSpinnerProps>(), {
  size: 'md',
  variant: 'primary',
})
const p = useDefaults(props, 'SSpinner')

const colorStyle = useColorProp(p, 's-spinner')
</script>

<template>
  <span
    class="s-spinner"
    :class="[`s-spinner--${p.size}`, `s-spinner--${p.variant}`]"
    :style="colorStyle"
    :role="p.label ? 'status' : undefined"
    :aria-label="p.label"
    :aria-hidden="p.label ? undefined : true"
  />
</template>

<style src="./SSpinner.scss" lang="scss"></style>
