<script setup lang="ts">
/**
 * Showcase of the built-in icon set. The list mirrors `BUILTIN_ICONS`
 * (`packages/core/src/composables/useIcons.ts`), since the registry does not expose its names.
 */
const ICONS = [
  'chevron-down',
  'chevron-up',
  'chevron-left',
  'chevron-right',
  'arrow-left',
  'arrow-right',
  'check',
  'x',
  'plus',
  'minus',
  'menu',
  'more-horizontal',
  'external-link',
  'search',
  'filter',
  'settings',
  'pencil',
  'trash-2',
  'copy',
  'download',
  'upload',
  'refresh-cw',
  'mail',
  'calendar',
  'clock',
  'bell',
  'user',
  'users',
  'home',
  'file-text',
  'folder',
  'eye',
  'eye-off',
  'lock',
  'log-out',
  'heart',
  'bookmark',
  'star',
  'tag',
  'map-pin',
  'phone',
  'credit-card',
  'shopping-cart',
  'sun',
  'moon',
  'info',
  'circle-check',
  'circle-alert',
  'triangle-alert',
  'circle-x',
  'circle-help',
  'package',
]
</script>

<template>
  <div class="icons s-root">
    <div
      v-for="name in ICONS"
      :key="name"
      class="icons__cell"
    >
      <SIcon
        :icon="name"
        :size="20"
      />
      <code class="icons__name">{{ name }}</code>
    </div>
  </div>
</template>

<style scoped>
.icons {
  display: grid;
  gap: 10px 16px;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.icons__cell {
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: 0;
  color: var(--s-color-text);
}
.icons__name {
  overflow: hidden;
  font-size: 12px;
  color: var(--vp-c-text-2);
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
