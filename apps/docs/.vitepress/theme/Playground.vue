<script setup lang="ts">
import { computed, reactive, ref, useSlots } from 'vue'
import type { SSelectOption } from '@smalt-ui/core'

/** A Playground control, declared on the component page. */
export interface PlaygroundControl {
  /** Name of the component prop the control drives. */
  prop: string
  /** Control label (defaults to the prop name). */
  label?: string
  /** UI control type. */
  type: 'select' | 'boolean' | 'text'
  /** Options for `select`. */
  options?: string[]
  /** Initial value. */
  default?: unknown
}

const props = withDefaults(
  defineProps<{
    /** Name of a globally registered component (e.g. `SButton`). */
    component: string
    /** Interactive controls. */
    controls?: PlaygroundControl[]
    /** Editable default slot text (when the page passes no slot of its own). */
    slot?: string
    /** Non-interactive props always passed to the component (e.g. `options`). */
    staticProps?: Record<string, unknown>
  }>(),
  {
    controls: () => [],
    slot: undefined,
    staticProps: () => ({}),
  },
)

const slots = useSlots()
const hasSlot = computed(() => Boolean(slots.default))
const slotText = ref(props.slot ?? '')
const editableSlot = computed(() => props.slot !== undefined && !hasSlot.value)

const model = reactive<Record<string, unknown>>({})
for (const c of props.controls) {
  model[c.prop] =
    c.default ?? (c.type === 'boolean' ? false : c.type === 'select' ? (c.options?.[0] ?? '') : '')
}

const bound = computed(() => ({ ...props.staticProps, ...model }))

/**
 * Two-way: `update:<prop>` writes back to the model, which covers v-model props
 * (`modelValue`, `open`) without special cases.
 */
const listeners = computed(() => {
  const l: Record<string, (v: unknown) => void> = {}
  for (const c of props.controls) l[`onUpdate:${c.prop}`] = (v) => (model[c.prop] = v)
  return l
})

function optionsFor(c: PlaygroundControl): SSelectOption[] {
  return (c.options ?? []).map((o) => ({ label: o, value: o }))
}

const code = computed(() => {
  const attrs: string[] = []
  for (const c of props.controls) {
    const v = model[c.prop]
    if (c.type === 'boolean') {
      if (v) attrs.push(c.prop)
    } else if (v !== '' && v != null) {
      attrs.push(`${c.prop}="${v}"`)
    }
  }
  for (const key of Object.keys(props.staticProps)) attrs.push(`:${key}="${key}"`)

  const attrStr = attrs.length ? ` ${attrs.join(' ')}` : ''
  const inner = slotText.value || (hasSlot.value ? '…' : '')
  return inner
    ? `<${props.component}${attrStr}>${inner}</${props.component}>`
    : `<${props.component}${attrStr} />`
})
</script>

<template>
  <div class="pg">
    <div class="pg__stage">
      <component
        :is="component"
        v-bind="bound"
        v-on="listeners"
      >
        <slot>{{ slotText }}</slot>
      </component>
    </div>

    <div class="pg__controls">
      <template
        v-for="c in controls"
        :key="c.prop"
      >
        <label
          v-if="c.type === 'select'"
          class="pg__field"
        >
          <span>{{ c.label ?? c.prop }}</span>
          <SSelect
            :model-value="model[c.prop]"
            :options="optionsFor(c)"
            :aria-label="c.label ?? c.prop"
            @update:model-value="model[c.prop] = $event"
          />
        </label>

        <label
          v-else-if="c.type === 'boolean'"
          class="pg__check"
        >
          <input
            v-model="model[c.prop]"
            type="checkbox"
          />
          <span>{{ c.label ?? c.prop }}</span>
        </label>

        <SInput
          v-else
          v-model="model[c.prop]"
          :label="c.label ?? c.prop"
        />
      </template>

      <SInput
        v-if="editableSlot"
        v-model="slotText"
        label="content"
      />
    </div>

    <pre class="pg__code"><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.pg {
  display: grid;
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.pg__stage {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 96px;
  background: var(--s-color-bg-subtle);
  border-radius: 8px;
}
.pg__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 16px;
}
.pg__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.pg__check {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}
.pg__code {
  margin: 0;
  padding: 12px 16px;
  font-size: 13px;
  color: var(--s-color-text);
  background: var(--s-color-bg-muted);
  border-radius: 6px;
  overflow-x: auto;
}
</style>
