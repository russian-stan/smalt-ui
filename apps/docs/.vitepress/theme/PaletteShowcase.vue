<script setup lang="ts">
const brand = ['primary', 'secondary', 'accent', 'positive', 'negative', 'info', 'warning', 'dark']
const families = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'grey',
  'blue-grey',
]
const stops = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const grayStops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
</script>

<template>
  <div class="pal s-root">
    <section class="pal__section">
      <h4 class="pal__heading">Brand colors</h4>
      <div class="pal__brand">
        <div
          v-for="name in brand"
          :key="name"
          class="pal__brand-item"
        >
          <span
            class="pal__brand-swatch"
            :style="{ background: `var(--s-${name})` }"
          />
          <span class="pal__brand-name">{{ name }}</span>
          <code class="pal__brand-token">--s-{{ name }}</code>
        </div>
      </div>
    </section>

    <section class="pal__section">
      <h4 class="pal__heading">Material palette</h4>
      <div class="pal__scroll">
        <div class="pal__grid">
          <div class="pal__grid-head">
            <span class="pal__grid-label" />
            <span
              v-for="s in stops"
              :key="s"
              class="pal__grid-stop"
              >{{ s }}</span
            >
          </div>
          <div
            v-for="family in families"
            :key="family"
            class="pal__grid-row"
          >
            <span class="pal__grid-label">{{ family }}</span>
            <span
              v-for="s in stops"
              :key="s"
              class="pal__cell"
              :style="{ background: `var(--s-${family}-${s})` }"
              :title="`--s-${family}-${s}`"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="pal__section">
      <h4 class="pal__heading">Neutral gray</h4>
      <div class="pal__scroll">
        <div class="pal__grid pal__grid--gray">
          <div class="pal__grid-head">
            <span class="pal__grid-label" />
            <span
              v-for="s in grayStops"
              :key="s"
              class="pal__grid-stop"
              >{{ s }}</span
            >
          </div>
          <div class="pal__grid-row">
            <span class="pal__grid-label">gray</span>
            <span
              v-for="s in grayStops"
              :key="s"
              class="pal__cell"
              :style="{ background: `var(--s-gray-${s})` }"
              :title="`--s-gray-${s}`"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pal {
  display: grid;
  gap: 28px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.pal__heading {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.pal__brand {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.pal__brand-item {
  display: grid;
  gap: 4px;
  width: 108px;
}
.pal__brand-swatch {
  block-size: 56px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}
.pal__brand-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.pal__brand-token {
  font-size: 11px;
  color: var(--vp-c-text-2);
}
.pal__scroll {
  overflow-x: auto;
}
.pal__grid {
  display: grid;
  gap: 4px;
  min-inline-size: 640px;
}
.pal__grid-head,
.pal__grid-row {
  display: grid;
  grid-template-columns: 88px repeat(14, 1fr);
  gap: 4px;
  align-items: center;
}
.pal__grid--gray .pal__grid-head,
.pal__grid--gray .pal__grid-row {
  grid-template-columns: 88px repeat(11, 1fr);
}
.pal__grid-label {
  font-size: 12px;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}
.pal__grid-stop {
  font-size: 11px;
  text-align: center;
  color: var(--vp-c-text-2);
}
.pal__cell {
  block-size: 26px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}
</style>
