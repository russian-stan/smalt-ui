<script setup lang="ts">
import { computed, ref } from 'vue'

/**
 * Showcase of the `flat`/`elevation` props: the switch and the scale act on every group at once
 * (panels, card, button and tooltip). Elevation is configured separately from shape, and that
 * only shows on several components side by side.
 */
const flat = ref(false)
// SToggleGroup works with string values, so the level is converted to a number when bound.
const level = ref<string | undefined>()

const bound = computed(() =>
  level.value === undefined
    ? { flat: flat.value }
    : { flat: flat.value, elevation: Number(level.value) },
)

const LEVELS = ['0', '1', '2', '3', '4', '5']

const cities = [
  { label: 'New York', value: 'nyc' },
  { label: 'London', value: 'ldn' },
]
const city = ref('nyc')

function reset() {
  flat.value = false
  level.value = undefined
}
</script>

<template>
  <div class="elev s-root">
    <div class="elev__bar">
      <SSwitch
        v-model="flat"
        label="flat"
      />
      <div class="elev__levels">
        <span class="elev__caption">elevation</span>
        <SToggleGroup
          v-model="level"
          :options="LEVELS.map((n) => ({ label: n, value: n }))"
          size="sm"
          aria-label="Elevation level"
        />
        <SButton
          variant="ghost"
          size="sm"
          @click="reset"
        >
          Reset
        </SButton>
      </div>
      <span class="elev__hint">
        {{
          level !== undefined
            ? `Level ${level}: elevation overrides flat`
            : flat
              ? 'No shadow'
              : 'Default levels'
        }}
      </span>
    </div>

    <div class="elev__grid">
      <section class="elev__group">
        <div class="elev__title">Surfaces</div>
        <SCard
          variant="elevated"
          v-bind="bound"
        >
          <template #header>Card</template>
          Level 1 by default.
        </SCard>
        <SToolbar v-bind="bound">
          <SButton
            variant="ghost"
            size="sm"
            icon="pencil"
            aria-label="Edit"
          />
          <SButton
            variant="ghost"
            size="sm"
            icon="copy"
            aria-label="Copy"
          />
          <SButton
            variant="ghost"
            size="sm"
            icon="trash-2"
            aria-label="Delete"
          />
        </SToolbar>
      </section>

      <section class="elev__group">
        <div class="elev__title">Controls</div>
        <div class="elev__row">
          <SButton
            variant="primary"
            v-bind="bound"
          >
            Button
          </SButton>
          <STooltip
            content="The tooltip follows the props too"
            v-bind="bound"
          >
            <template #trigger>
              <SButton variant="outline">Tooltip</SButton>
            </template>
          </STooltip>
        </div>
        <div class="elev__note">
          The button's shadow rises one step on hover, including when a level is set.
        </div>
      </section>

      <section class="elev__group">
        <div class="elev__title">Floating panels</div>
        <SSelect
          v-model="city"
          :options="cities"
          label="City"
          v-bind="bound"
        />
        <div class="elev__row">
          <SPopover v-bind="bound">
            <template #trigger>
              <SButton variant="outline">Popover</SButton>
            </template>
            Popover panel.
          </SPopover>
          <SDropdownMenu
            :items="[{ label: 'Download' }, { label: 'Print' }]"
            v-bind="bound"
          >
            <template #trigger>
              <SButton variant="outline">Menu</SButton>
            </template>
          </SDropdownMenu>
        </div>
        <div class="elev__note">Open the list or the menu: the panels follow the props too.</div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.elev {
  display: grid;
  gap: 20px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.elev__bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.elev__levels {
  display: flex;
  gap: 8px;
  align-items: center;
}
.elev__caption {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.elev__hint {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.elev__grid {
  display: grid;
  gap: 24px;
  padding: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}
.elev__group {
  display: grid;
  gap: 12px;
  align-content: start;
}
.elev__title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
}
.elev__row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.elev__note {
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-3);
}
</style>
