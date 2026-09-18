<script setup lang="ts">
import { AspectRatio } from 'reka-ui'
import { useDefaults } from '../../composables'
import type { SAspectRatioProps } from './types'

const props = withDefaults(defineProps<SAspectRatioProps>(), {
  ratio: 1,
})
const p = useDefaults(props, 'SAspectRatio')

defineSlots<{
  /** Content with a fixed aspect ratio (image, video, map, placeholder). */
  default?: (props: Record<string, never>) => unknown
}>()
</script>

<template>
  <AspectRatio
    :ratio="p.ratio"
    class="s-aspect-ratio"
  >
    <slot />
  </AspectRatio>
</template>

<style src="./SAspectRatio.scss" lang="scss"></style>
