<script setup lang="ts">
import { computed, useId } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { SLabel } from '../../internal/SLabel'
import { useColorProp, useDefaults } from '../../composables'
import type { SSwitchProps } from './types'

const props = defineProps<SSwitchProps>()
const p = useDefaults(props, 'SSwitch')

const colorStyle = useColorProp(p, 's-switch')

/** Switch state. Two-way bound via `v-model`. */
const model = defineModel<boolean>({ default: false })

defineSlots<{
  /** Label text (an alternative to the `label` prop). */
  default?: (props: Record<string, never>) => unknown
}>()

const uid = useId()
const switchId = computed(() => p.id ?? `s-switch-${uid}`)
</script>

<template>
  <div
    class="s-switch"
    :class="{ 's-switch--disabled': p.disabled }"
    :style="colorStyle"
  >
    <SwitchRoot
      :id="switchId"
      v-model="model"
      class="s-switch__track"
      :disabled="p.disabled"
      :required="p.required"
    >
      <SwitchThumb class="s-switch__thumb" />
    </SwitchRoot>

    <SLabel
      v-if="p.label || $slots.default"
      class="s-switch__label"
      :for="switchId"
      :disabled="p.disabled"
    >
      <slot>{{ p.label }}</slot>
    </SLabel>
  </div>
</template>

<style src="./SSwitch.scss" lang="scss"></style>
