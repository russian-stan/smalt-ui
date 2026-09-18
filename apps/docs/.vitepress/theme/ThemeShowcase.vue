<script setup lang="ts">
import { ref, watch } from 'vue'
import { createTheme, injectTheme } from '@smalt-ui/core'

const THEME_ID = 'docs-custom-theme'
const primary = ref('#1976d2')
const radius = ref('0.5rem')

const presets = [
  { name: 'Blue', color: '#1976d2' },
  { name: 'Teal', color: '#26a69a' },
  { name: 'Violet', color: '#7c3aed' },
  { name: 'Red', color: '#dc2626' },
  { name: 'Emerald', color: '#059669' },
  { name: 'Orange', color: '#ea580c' },
]

function apply() {
  injectTheme(
    createTheme({
      'color-primary': primary.value,
      'color-primary-hover': primary.value,
      'color-primary-active': primary.value,
      'radius-md': radius.value,
    }),
    THEME_ID,
  )
}

function reset() {
  primary.value = '#1976d2'
  radius.value = '0.5rem'
  injectTheme('', THEME_ID)
}

watch([primary, radius], apply)
</script>

<template>
  <div class="ts">
    <div class="ts__controls">
      <div class="ts__presets">
        <button
          v-for="p in presets"
          :key="p.color"
          class="ts__swatch"
          :style="{ background: p.color }"
          :title="p.name"
          type="button"
          @click="primary = p.color"
        />
      </div>
      <label class="ts__field">
        <span>Primary color</span>
        <input
          v-model="primary"
          type="color"
        />
      </label>
      <label class="ts__field">
        <span>Radius</span>
        <input
          v-model="radius"
          type="text"
        />
      </label>
      <SButton
        variant="ghost"
        size="sm"
        @click="reset"
      >
        Reset
      </SButton>
    </div>

    <div class="ts__preview">
      <SButton variant="primary">Primary</SButton>
      <SButton variant="secondary">Secondary</SButton>
      <SButton variant="outline">Outline</SButton>
      <SButton variant="danger">Danger</SButton>
      <SInput
        label="Input"
        placeholder="Text…"
        style="min-width: 180px"
      />
    </div>
  </div>
</template>

<style scoped>
.ts {
  display: grid;
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.ts__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 16px;
}
.ts__presets {
  display: flex;
  gap: 6px;
}
.ts__swatch {
  width: 28px;
  height: 28px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 50%;
  cursor: pointer;
}
.ts__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.ts__preview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: var(--s-color-bg-subtle);
  border-radius: 8px;
}
</style>
