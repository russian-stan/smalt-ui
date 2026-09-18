<script setup lang="ts">
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'reka-ui'
import { SFormField } from '../SFormField'
import { SIcon } from '../SIcon'
import { useDefaults, useMessages } from '../../composables'
import type { SNumberFieldProps } from './types'

const props = withDefaults(defineProps<SNumberFieldProps>(), {
  invalid: false,
  required: false,
  disabled: false,
  step: 1,
})
const p = useDefaults(props, 'SNumberField')

const m = useMessages()

/** Numeric value of the field. Two-way binding via `v-model`. */
const model = defineModel<number | null>({ default: null })
</script>

<template>
  <SFormField
    :id="p.id"
    :floating-label="false"
    class="s-number-field"
    :label="p.label"
    :hint="p.hint"
    :error="p.error"
    :invalid="p.invalid"
    :required="p.required"
    :square="p.square"
  >
    <template #default="{ id: fieldId, describedBy, invalid: fieldInvalid }">
      <NumberFieldRoot
        v-model="model"
        class="s-number-field__control"
        :min="p.min"
        :max="p.max"
        :step="p.step"
        :disabled="p.disabled"
      >
        <NumberFieldDecrement
          class="s-number-field__button"
          :aria-label="p.decrementLabel ?? m.decrement"
        >
          <SIcon
            icon="minus"
            :size="16"
          />
        </NumberFieldDecrement>

        <NumberFieldInput
          :id="fieldId"
          class="s-number-field__input"
          :placeholder="p.placeholder"
          :required="p.required"
          :aria-invalid="fieldInvalid || undefined"
          :aria-describedby="describedBy"
        />

        <NumberFieldIncrement
          class="s-number-field__button"
          :aria-label="p.incrementLabel ?? m.increment"
        >
          <SIcon
            icon="plus"
            :size="16"
          />
        </NumberFieldIncrement>
      </NumberFieldRoot>
    </template>
  </SFormField>
</template>

<style src="./SNumberField.scss" lang="scss"></style>
