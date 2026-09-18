<script setup lang="ts">
const scale = [
  { k: '0', rem: '0' },
  { k: '1', rem: '0.25rem' },
  { k: '2', rem: '0.5rem' },
  { k: '3', rem: '0.75rem' },
  { k: '4', rem: '1rem' },
  { k: '5', rem: '1.25rem' },
  { k: '6', rem: '1.5rem' },
  { k: '8', rem: '2rem' },
  { k: '10', rem: '2.5rem' },
  { k: '12', rem: '3rem' },
  { k: '16', rem: '4rem' },
]
</script>

<template>
  <div class="sp s-root">
    <div
      v-for="s in scale"
      :key="s.k"
      class="sp__row"
    >
      <code class="sp__key">{{ s.k }}</code>
      <span
        class="sp__bar"
        :style="{ inlineSize: `var(--s-space-${s.k})` }"
      />
      <span class="sp__rem">{{ s.rem }}</span>
    </div>
  </div>
</template>

<style scoped>
.sp {
  display: grid;
  gap: 8px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.sp__row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.sp__key {
  flex: none;
  inline-size: 2rem;
  font-size: 12px;
  text-align: center;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 2px 0;
  border-radius: 4px;
}
.sp__bar {
  block-size: 16px;
  min-inline-size: 1px;
  background: var(--s-color-primary);
  border-radius: 2px;
}
.sp__rem {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
