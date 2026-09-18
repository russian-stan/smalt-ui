<script setup lang="ts">
const FONT = 'Inter'

const roles = [
  { cls: 's-text-h1', label: 'Heading 1', sample: 'Heading', font: FONT },
  { cls: 's-text-h2', label: 'Heading 2', sample: 'Heading', font: FONT },
  { cls: 's-text-h3', label: 'Heading 3', sample: 'Heading', font: FONT },
  { cls: 's-text-h4', label: 'Heading 4', sample: 'Heading', font: FONT },
  { cls: 's-text-h5', label: 'Heading 5', sample: 'Heading', font: FONT },
  { cls: 's-text-h6', label: 'Heading 6', sample: 'Heading', font: FONT },
  { cls: 's-text-subtitle1', label: 'Subtitle 1', sample: 'Subtitle', font: FONT },
  { cls: 's-text-subtitle2', label: 'Subtitle 2', sample: 'Subtitle', font: FONT },
  { cls: 's-text-body1', label: 'Body 1', sample: 'Paragraph body text', font: FONT },
  { cls: 's-text-body2', label: 'Body 2', sample: 'Paragraph body text', font: FONT },
  { cls: 's-text-caption', label: 'Caption', sample: 'Element caption', font: FONT },
  { cls: 's-text-overline', label: 'Overline', sample: 'Overline text', font: FONT },
]
</script>

<template>
  <div class="tg s-root">
    <div
      v-for="r in roles"
      :key="r.cls"
      class="tg__row"
    >
      <div
        class="tg__sample"
        :class="r.cls"
      >
        {{ r.sample }}
      </div>
      <div class="tg__meta">
        <span class="tg__label">{{ r.label }}</span>
        <span class="tg__font">{{ r.font }}</span>
        <code class="tg__cls">.{{ r.cls }}</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tg {
  display: grid;
  gap: 4px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.tg__row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.tg__row:last-child {
  border-bottom: 0;
}
.tg__sample {
  min-width: 0;
  color: var(--s-color-text);
}
.tg__meta {
  display: flex;
  flex-shrink: 0;
  align-items: baseline;
  gap: 10px;
}
.tg__font {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.tg__label {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.tg__cls {
  font-size: 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
