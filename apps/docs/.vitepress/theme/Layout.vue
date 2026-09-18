<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { watchEffect } from 'vue'

const { Layout } = DefaultTheme
const { isDark } = useData()

const version = __SMALT_VERSION__

// Keeps the VitePress theme toggle (.dark) in sync with the Smalt UI data-theme.
if (typeof document !== 'undefined') {
  watchEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  })
}
</script>

<template>
  <Layout>
    <template #nav-bar-title-after>
      <span class="version">{{ version }}</span>
    </template>
  </Layout>
</template>

<style scoped>
.version {
  padding: 2px 6px;
  margin-left: 8px;
  font-size: 12px;
  font-weight: var(--s-font-weight-medium);
  line-height: 18px;
  color: var(--s-color-text-muted);
  background-color: var(--vp-c-default-soft);
  border-radius: var(--s-radius-sm);
}
</style>
