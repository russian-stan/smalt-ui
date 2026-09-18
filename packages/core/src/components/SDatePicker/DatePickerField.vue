<script setup lang="ts">
import { DatePickerField as RekaDatePickerField, DatePickerInput, DatePickerTrigger } from 'reka-ui'
import { SIcon } from '../SIcon'
import { visibleSegments } from '../../internal/dateSegments'
import { useMessages } from '../../composables'

/**
 * Private part of SDatePicker: the segmented date input + the open-calendar button. Rendered
 * inside the wrapper's `DatePickerRoot` (the Reka context is available via inject). Styles are
 * global BEM from SDatePicker.scss.
 */
defineProps<{
  fieldId: string
  labelId?: string
  label?: string
  floating?: boolean
  filled?: boolean
  required?: boolean
  describedBy?: string
  invalid: boolean
  openCalendarLabel?: string
}>()

const m = useMessages()

defineSlots<{
  prepend?: (props: Record<string, never>) => unknown
  append?: (props: Record<string, never>) => unknown
}>()
</script>

<template>
  <RekaDatePickerField
    :id="fieldId"
    v-slot="{ segments }"
    class="s-date-picker__control"
    :class="{ 's-date-picker__control--floating': floating }"
    :data-filled="filled || undefined"
    :aria-labelledby="labelId"
    :aria-invalid="invalid || undefined"
    :aria-describedby="describedBy"
  >
    <label
      v-if="floating"
      :id="labelId"
      class="s-date-picker__label"
    >
      {{ label }}
      <span
        v-if="required"
        class="s-date-picker__label-required"
        aria-hidden="true"
        >*</span
      >
    </label>
    <span
      v-if="$slots.prepend"
      class="s-date-picker__prepend"
    >
      <slot name="prepend" />
    </span>
    <DatePickerInput
      v-for="item in visibleSegments(segments)"
      :key="item.part"
      :part="item.part"
      class="s-date-picker__segment"
      :class="{ 's-date-picker__segment--literal': item.part === 'literal' }"
    >
      {{ item.value }}
    </DatePickerInput>

    <DatePickerTrigger
      class="s-date-picker__trigger"
      :aria-label="openCalendarLabel ?? m.openCalendar"
    >
      <SIcon
        icon="calendar"
        :size="18"
      />
    </DatePickerTrigger>
    <span
      v-if="$slots.append"
      class="s-date-picker__append"
    >
      <slot name="append" />
    </span>
  </RekaDatePickerField>
</template>
