<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { useDefaults, useElevationProp } from '../../composables'
import type { SCardProps } from './types'

const props = withDefaults(defineProps<SCardProps>(), {
  as: 'div',
  variant: 'outline',
  interactive: false,
  selected: false,
  disabled: false,
})
const p = useDefaults(props, 'SCard')

/**
 * The zero value is a transparent shadow rather than `none`: the selection ring is in the same
 * list, and the keyword would invalidate the whole declaration.
 */
const elevationStyle = useElevationProp(p, 's-card', { zero: '0 0 #0000' })

defineSlots<{
  /** Card header. */
  header?: (props: Record<string, never>) => unknown
  /** Main content. */
  default?: (props: Record<string, never>) => unknown
  /** Card footer. */
  footer?: (props: Record<string, never>) => unknown
}>()
</script>

<template>
  <!-- data-selected/-disabled in addition to classes: the consumer and nested elements style the
       card by them without depending on the order of BEM modifiers. -->
  <Primitive
    :as="p.as"
    class="s-card"
    :class="[
      `s-card--${p.variant}`,
      {
        's-card--square': p.square,
        's-card--interactive': p.interactive,
        's-card--selected': p.selected,
        's-card--disabled': p.disabled,
      },
    ]"
    :style="elevationStyle"
    :data-selected="p.selected || undefined"
    :data-disabled="p.disabled || undefined"
  >
    <div
      v-if="$slots.header"
      class="s-card__header"
    >
      <slot name="header" />
    </div>
    <div
      class="s-card__body"
      :class="p.bodyClass"
    >
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="s-card__footer"
    >
      <slot name="footer" />
    </div>
  </Primitive>
</template>

<style src="./SCard.scss" lang="scss"></style>
