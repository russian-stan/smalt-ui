<script setup lang="ts">
import { computed } from 'vue'
import { STag } from '../STag'
import type { SSelectOption } from './types'

/**
 * Internal rendering of the selected `SSelect` values as tags (`use-tags`): removable `STag`
 * chips. Shared by the Select/Combobox branches. Not public.
 */
const props = defineProps<{
  options: readonly SSelectOption[]
  values: string[]
  disabled?: boolean
}>()

const emit = defineEmits<{
  /** Removes a value from the selection. */
  remove: [value: string]
}>()

const chips = computed(() =>
  props.values.map((v) => ({
    value: v,
    label: props.options.find((o) => o.value === v)?.label ?? v,
  })),
)
</script>

<template>
  <STag
    v-for="chip in chips"
    :key="chip.value"
    class="s-select__tag"
    :removable="!disabled"
    @remove="emit('remove', chip.value)"
    >{{ chip.label }}</STag
  >
</template>
