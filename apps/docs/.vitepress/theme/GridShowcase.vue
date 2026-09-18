<script setup lang="ts">
// Columns are separated by borders, not a gutter: the showcase needs no negative row margins.
const rows = [[12], [6, 6], [4, 4, 4], [3, 3, 3, 3], [2, 2, 2, 2, 2, 2]]
</script>

<template>
  <div class="gs s-root">
    <div
      v-for="(row, i) in rows"
      :key="i"
      class="s-row"
    >
      <div
        v-for="(span, j) in row"
        :key="j"
        :class="`s-col-${span}`"
      >
        <div class="gs__box">{{ span }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gs {
  display: grid;
  gap: 8px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.gs__box {
  padding: 8px 0;
  font-size: 13px;
  text-align: center;
  color: var(--s-color-primary);
  background: var(--s-color-primary-subtle);
  border: 1px solid var(--s-color-primary);
  border-radius: 4px;
}
</style>
