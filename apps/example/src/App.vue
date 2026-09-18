<script setup lang="ts">
import { ref } from 'vue'
import { createTheme, injectTheme, useColorMode } from '@smalt-ui/core'
import type { SSelectOption } from '@smalt-ui/core'

const { scheme, toggle } = useColorMode()

const name = ref('')
const city = ref<string>()
const dialogOpen = ref(false)

const cities: SSelectOption[] = [
  { label: 'New York', value: 'nyc' },
  { label: 'London', value: 'lon' },
  { label: 'Berlin', value: 'ber' },
]

function purpleTheme() {
  injectTheme(
    createTheme({
      'color-primary': '#7c3aed',
      'color-primary-hover': '#6d28d9',
    }),
    'example-theme',
  )
}

function resetTheme() {
  injectTheme('', 'example-theme')
}
</script>

<template>
  <div class="app s-root s-root--app">
    <header class="app__header">
      <h1>Smalt UI · Example (Vue 3)</h1>
      <SButton
        variant="outline"
        size="sm"
        data-testid="theme-toggle"
        @click="toggle"
      >
        Theme: {{ scheme }}
      </SButton>
    </header>

    <section>
      <h2>Buttons</h2>
      <div class="row">
        <SButton variant="primary">Primary</SButton>
        <SButton variant="secondary">Secondary</SButton>
        <SButton variant="outline">Outline</SButton>
        <SButton variant="ghost">Ghost</SButton>
        <SButton variant="negative">Negative</SButton>
        <SButton loading>Loading</SButton>
      </div>
    </section>

    <section>
      <h2>Icons</h2>
      <div class="row">
        <SButton
          variant="primary"
          icon="rocket"
        >
          Launch
        </SButton>
        <SButton
          variant="negative"
          icon="trash"
          icon-right="chevron-down"
        >
          Delete
        </SButton>
        <SButton
          variant="ghost"
          icon="x"
          aria-label="Close"
        />
        <SInput
          v-model="name"
          icon="search"
          clearable
          placeholder="Search"
          style="max-width: 240px"
        />
      </div>
    </section>

    <section>
      <h2>Form</h2>
      <div class="row">
        <SInput
          v-model="name"
          label="Name"
          placeholder="Enter your name"
          style="max-width: 260px"
        />
        <SSelect
          v-model="city"
          :options="cities"
          placeholder="City"
          aria-label="City"
        />
      </div>
      <p data-testid="form-state">Name: "{{ name }}", City: "{{ city ?? '—' }}"</p>
    </section>

    <section>
      <h2>Dialog</h2>
      <SDialog
        v-model:open="dialogOpen"
        title="Example"
        description="SDialog from @smalt-ui/core"
      >
        <template #trigger>
          <SButton>Open dialog</SButton>
        </template>
        Dialog content.
        <template #footer>
          <SButton
            variant="ghost"
            @click="dialogOpen = false"
            >Cancel</SButton
          >
          <SButton
            variant="primary"
            @click="dialogOpen = false"
            >OK</SButton
          >
        </template>
      </SDialog>
    </section>

    <section>
      <h2>App styles override the library</h2>
      <p>
        A single app class, with no <code>!important</code> and no doubled selector: the app's rules
        live outside the <code>smalt</code> cascade layer and beat it regardless of load order. The
        button below should be square-cornered and have no shadow.
      </p>
      <div class="row">
        <SButton
          variant="primary"
          class="flatButton"
          data-testid="override"
          >Overridden by the app</SButton
        >
        <SButton variant="primary">Library default</SButton>
      </div>
    </section>

    <section>
      <h2>Custom palette</h2>
      <div class="row">
        <SButton
          variant="primary"
          data-testid="theme-purple"
          @click="purpleTheme"
          >Purple</SButton
        >
        <SButton
          variant="outline"
          @click="resetTheme"
          >Reset</SButton
        >
      </div>
    </section>
  </div>
</template>

<style>
.app {
  max-width: 880px;
  margin: 0 auto;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.app__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
/*
 * Cascade check: a single app class overrides the component styles even though the component CSS
 * reaches the document later, because component styles live in @layer.
 */
.flatButton {
  border-radius: 0;
  box-shadow: none;
}
</style>
