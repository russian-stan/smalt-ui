<script setup lang="ts">
import { ToolbarRoot } from 'reka-ui'
import { useDefaults, useElevationProp } from '../../composables'
import type { SToolbarProps } from './types'

const props = withDefaults(defineProps<SToolbarProps>(), {
  orientation: 'horizontal',
  loop: true,
})
const p = useDefaults(props, 'SToolbar')

const elevationStyle = useElevationProp(p, 's-toolbar')

defineSlots<{
  /** Toolbar actions: buttons (`SButton`), toggles, separators (`SSeparator`). */
  default?: (props: Record<string, never>) => unknown
}>()
</script>

<template>
  <ToolbarRoot
    :orientation="p.orientation"
    :loop="p.loop"
    :aria-label="p.ariaLabel"
    class="s-toolbar"
    :class="[`s-toolbar--${p.orientation}`, { 's-toolbar--square': p.square }]"
    :style="elevationStyle"
  >
    <slot />
  </ToolbarRoot>
</template>

<style src="./SToolbar.scss" lang="scss"></style>
