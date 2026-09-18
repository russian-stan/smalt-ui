<script setup lang="ts">
import { computed } from 'vue'
import { useDefaults } from '../../composables'
import type { SSkeletonProps } from './types'

const props = withDefaults(defineProps<SSkeletonProps>(), {
  variant: 'text',
  animated: true,
})
const p = useDefaults(props, 'SSkeleton')

const toCss = (v?: string | number) => (typeof v === 'number' ? `${v}px` : v)

const style = computed(() => ({
  width: toCss(p.width),
  height: toCss(p.height),
}))
</script>

<template>
  <span
    class="s-skeleton"
    :class="[`s-skeleton--${p.variant}`, { 's-skeleton--animated': p.animated }]"
    :style="style"
    aria-hidden="true"
  />
</template>

<style src="./SSkeleton.scss" lang="scss"></style>
