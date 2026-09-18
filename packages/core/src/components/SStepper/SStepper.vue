<script setup lang="ts">
import {
  StepperRoot,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
} from 'reka-ui'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { SIcon } from '../SIcon'
import { useColorProp, useDefaults, useMessages } from '../../composables'
import type { SStepperLabelPlacement, SStepperProps } from './types'

const props = withDefaults(defineProps<SStepperProps>(), {
  orientation: 'horizontal',
  linear: false,
  doneIcon: 'check',
  narrowOrientation: 'vertical',
  activeVariant: 'tonal',
})
const p = useDefaults(props, 'SStepper')

const colorStyle = useColorProp(p, 's-stepper')
const m = useMessages()

const root = ref<HTMLElement | null>(null)
const width = ref<number>()

/**
 * The width is taken from the parent, not the window or the stepper itself: in a narrow column
 * steps overlap even on a wide screen, and a collapsed stepper in a flex container shrinks to its
 * content — its own width would stop reflecting the available space, and it would never expand
 * back. The observer is created only when the prop is set.
 */
let observer: ResizeObserver | undefined

function watchWidth() {
  observer?.disconnect()
  observer = undefined
  width.value = undefined
  if (!root.value || p.stackAt === undefined) return

  const container = root.value.parentElement ?? root.value

  observer = new ResizeObserver(([entry]) => {
    /**
     * The measurement is deferred by a frame: an orientation change alters the layout right from
     * the callback, and the browser logs an unfinished observer loop to the app console.
     */
    requestAnimationFrame(() => {
      width.value = entry.contentRect.width
    })
  })
  observer.observe(container)
}

onMounted(watchWidth)
watch(() => p.stackAt, watchWidth)
onBeforeUnmount(() => observer?.disconnect())

/**
 * Orientation after collapsing. Until the first measurement (server, first frame) the declared
 * one is kept: the server has nothing to guess the width from, and a wrong guess would cost a
 * hydration mismatch.
 */
const orientation = computed(() =>
  p.stackAt !== undefined && width.value !== undefined && width.value < p.stackAt
    ? p.narrowOrientation
    : p.orientation,
)

/**
 * The default depends on the orientation: a horizontal stepper labels steps below, a vertical
 * one on the right. A shared value is impossible here — it would move the label when the
 * orientation changes.
 */
const placement = computed<SStepperLabelPlacement>(
  () => p.labelPlacement ?? (orientation.value === 'vertical' ? 'end' : 'bottom'),
)

/** Current active step (1-based). Two-way binding via `v-model`. */
const model = defineModel<number>({ default: 1 })
</script>

<template>
  <!-- as-child: the root must be our own DOM node — ResizeObserver tracks its width. -->
  <StepperRoot
    v-model="model"
    as-child
    :orientation="orientation"
    :linear="p.linear"
  >
    <div
      ref="root"
      class="s-stepper"
      :class="[
        `s-stepper--${orientation}`,
        `s-stepper--label-${placement}`,
        { 's-stepper--active-filled': p.activeVariant === 'filled' },
      ]"
      :style="colorStyle"
    >
      <StepperItem
        v-for="(item, index) in p.items"
        :key="index"
        :step="index + 1"
        :disabled="item.disabled"
        class="s-stepper__item"
        :class="{ 's-stepper__item--disabled': item.disabled }"
      >
        <StepperTrigger class="s-stepper__trigger">
          <StepperIndicator class="s-stepper__indicator">
            <SIcon
              v-if="item.icon"
              :icon="item.icon"
              :size="20"
            />
            <template v-else>
              <SIcon
                class="s-stepper__check"
                :icon="p.doneIcon"
                :size="20"
                :label="m.stepCompleted"
              />
              <span class="s-stepper__number">{{ index + 1 }}</span>
            </template>
          </StepperIndicator>

          <span class="s-stepper__text">
            <!-- as="div": no h4/p, otherwise host tag styles (e.g. .vp-doc h4) override our
               classes by specificity. Reka roles carry the semantics. -->
            <StepperTitle
              as="div"
              class="s-stepper__title"
              >{{ item.title }}</StepperTitle
            >
            <StepperDescription
              v-if="item.description"
              as="div"
              class="s-stepper__description"
            >
              {{ item.description }}
            </StepperDescription>
          </span>
        </StepperTrigger>

        <StepperSeparator
          v-if="index < p.items.length - 1"
          class="s-stepper__separator"
        />
      </StepperItem>
    </div>
  </StepperRoot>
</template>

<style src="./SStepper.scss" lang="scss"></style>
