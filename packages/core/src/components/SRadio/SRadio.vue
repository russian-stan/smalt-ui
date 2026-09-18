<script setup lang="ts">
import { computed, useId } from 'vue'
import { RadioGroupIndicator, RadioGroupItem } from 'reka-ui'
import { SLabel } from '../../internal/SLabel'
import { useColorProp, useDefaults } from '../../composables'
import type { SRadioProps } from './types'

// Group item: used inside SRadioGroup (it takes the group context).
const props = withDefaults(defineProps<SRadioProps>(), {
  align: 'start',
})
const p = useDefaults(props, 'SRadio')

const colorStyle = useColorProp(p, 's-radio')

defineSlots<{
  /** Label text (alternative to the `label` prop). */
  default?: (props: Record<string, never>) => unknown
}>()

const uid = useId()
const radioId = computed(() => p.id ?? `s-radio-${uid}`)
</script>

<template>
  <div
    class="s-radio"
    :class="{
      's-radio--disabled': p.disabled,
      's-radio--align-center': p.align === 'center',
      's-radio--stretch': p.stretch,
    }"
    :style="colorStyle"
  >
    <RadioGroupItem
      :id="radioId"
      class="s-radio__control"
      :value="p.value"
      :disabled="p.disabled"
    >
      <RadioGroupIndicator class="s-radio__indicator" />
    </RadioGroupItem>

    <SLabel
      v-if="p.label || $slots.default"
      class="s-radio__label"
      :for="radioId"
      :disabled="p.disabled"
    >
      <slot>{{ p.label }}</slot>
    </SLabel>
  </div>
</template>

<style src="./SRadio.scss" lang="scss"></style>
