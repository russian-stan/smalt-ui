<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ title?: string }>()
const showCode = ref(false)
</script>

<template>
  <div class="demo">
    <div
      v-if="title"
      class="demo__title"
    >
      {{ title }}
    </div>
    <div class="demo__preview s-root">
      <slot />
    </div>
    <div class="demo__actions">
      <button
        class="demo__toggle"
        type="button"
        @click="showCode = !showCode"
      >
        {{ showCode ? 'Hide code' : 'Show code' }}
      </button>
    </div>
    <div
      v-show="showCode"
      class="demo__code"
    >
      <slot name="code" />
    </div>
  </div>
</template>

<style scoped>
.demo {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}
.demo__title {
  padding: 8px 16px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}
.demo__preview {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 12px;
  padding: 24px;
}
/* Previews live inside `.vp-doc`, which styles ul/li/a/p/table with tag selectors. The library's
   isolation (`.s-root`, `reset-inherited`) only stops inheritance, so the reset lives here. */
.demo__preview :deep(ul),
.demo__preview :deep(ol) {
  margin: 0;
  padding: 0;
  list-style: none;
}
.demo__preview :deep(li) {
  margin: 0;
}
.demo__preview :deep(a) {
  text-decoration: none;
  font-weight: inherit;
}
.demo__preview :deep(p) {
  margin: 0;
  line-height: inherit;
}
/* The `.demo ` prefix raises specificity above the VitePress zebra stripes
   `.vp-doc tr:nth-child(2n)` = (0,2,1), which would otherwise override the row reset. */
.demo .demo__preview :deep(table) {
  display: revert;
  width: auto;
  margin: 0;
  border: 0;
}
.demo .demo__preview :deep(tr),
.demo .demo__preview :deep(th),
.demo .demo__preview :deep(td) {
  padding: 0;
  background: none;
  border: 0;
}
.demo__actions {
  display: flex;
  justify-content: flex-end;
  padding: 6px 12px;
  border-top: 1px dashed var(--vp-c-divider);
}
.demo__toggle {
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  cursor: pointer;
}
.demo__toggle:hover {
  color: var(--vp-c-brand-1);
}
.demo__code :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
}
</style>
