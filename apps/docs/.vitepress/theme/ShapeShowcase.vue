<script setup lang="ts">
import { ref } from 'vue'

/**
 * Showcase of the `square` prop: one switch for every group of components at once. More than
 * thirty components declare the prop, and its point is consistency, which a separate section on
 * each page would not show.
 */
const square = ref(true)

const cities = [
  { label: 'New York', value: 'nyc' },
  { label: 'London', value: 'ldn' },
  { label: 'Berlin', value: 'ber' },
]
const city = ref('nyc')
const agree = ref(true)
const level = ref(35)
</script>

<template>
  <div class="shape s-root">
    <div class="shape__bar">
      <SSwitch
        v-model="square"
        label="square"
      />
      <span class="shape__hint">
        {{ square ? 'Square corners' : 'Default radius: 8px' }}
      </span>
    </div>

    <div class="shape__grid">
      <section class="shape__group">
        <div class="shape__title">Fields</div>
        <SInput
          label="Recipient"
          model-value="Acme Inc."
          :square="square"
        />
        <SSelect
          v-model="city"
          :options="cities"
          label="City"
          :square="square"
        />
        <STextarea
          label="Comment"
          model-value="Fragile cargo"
          :rows="2"
          :square="square"
        />
      </section>

      <section class="shape__group">
        <div class="shape__title">Controls</div>
        <div class="shape__row">
          <SButton
            variant="primary"
            :square="square"
          >
            Send
          </SButton>
          <SButton
            variant="outline"
            :square="square"
          >
            Cancel
          </SButton>
          <SButton
            icon="trash-2"
            variant="ghost"
            aria-label="Delete"
            :square="square"
          />
        </div>
        <SCheckbox
          v-model="agree"
          label="I agree to the terms"
        />
        <div class="shape__row">
          <SBadge :square="square">New</SBadge>
          <STag :square="square">Fragile</STag>
          <SToggle :square="square">Option</SToggle>
        </div>
        <SSlider v-model="level" />
        <div class="shape__note">
          Some controls get their shape from their role, not from the interface style, so `square`
          leaves them alone: slider, radio, switch and avatar stay round, and the checkbox box keeps
          a fixed 2px radius.
        </div>
      </section>

      <section class="shape__group">
        <div class="shape__title">Surfaces</div>
        <SCard :square="square">
          <template #header>Order #1024</template>
          The card, the alert and floating panels keep the same radius; open the menu or the popover
          to see it.
        </SCard>
        <SAlert
          variant="info"
          title="Delivery tomorrow"
          :square="square"
        />
        <div class="shape__row">
          <SPopover :square="square">
            <template #trigger>
              <SButton
                variant="outline"
                :square="square"
              >
                Popover
              </SButton>
            </template>
            Popover panel.
          </SPopover>
          <SDropdownMenu
            :items="[{ label: 'Download' }, { label: 'Print' }]"
            :square="square"
          >
            <template #trigger>
              <SButton
                variant="outline"
                :square="square"
              >
                Menu
              </SButton>
            </template>
          </SDropdownMenu>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.shape {
  display: grid;
  gap: 20px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.shape__bar {
  display: flex;
  gap: 12px;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.shape__hint {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.shape__grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
.shape__group {
  display: grid;
  gap: 12px;
  align-content: start;
}
.shape__title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
}
.shape__note {
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-3);
}
.shape__row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
</style>
