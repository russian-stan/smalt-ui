<script setup lang="ts">
import { computed } from 'vue'
import { SIcon } from '../SIcon'
import { useColorProp, useDefaults } from '../../composables'
import type { SBadgeProps } from './types'

const props = withDefaults(defineProps<SBadgeProps>(), {
  variant: 'neutral',
  size: 'md',
})
const p = useDefaults(props, 'SBadge')

const colorStyle = useColorProp(p, 's-badge')

defineSlots<{
  /** Badge content (text, number). */
  default?: (props: Record<string, never>) => unknown
}>()

const ICON_SIZES = { sm: 12, md: 14, lg: 16 } as const
const iconSize = computed(() => ICON_SIZES[p.size] ?? ICON_SIZES.md)
</script>

<template>
  <span
    class="s-badge"
    :class="[`s-badge--${p.variant}`, `s-badge--${p.size}`, { 's-badge--square': p.square }]"
    :style="colorStyle"
  >
    <SIcon
      v-if="p.icon"
      :icon="p.icon"
      :size="iconSize"
    />
    <slot />
    <SIcon
      v-if="p.iconRight"
      :icon="p.iconRight"
      :size="iconSize"
    />
  </span>
</template>

<style src="./SBadge.scss" lang="scss"></style>
