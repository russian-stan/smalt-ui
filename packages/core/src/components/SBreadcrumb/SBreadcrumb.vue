<script setup lang="ts">
import { computed } from 'vue'
import { SIcon } from '../SIcon'
import { useDefaults, useMessages } from '../../composables'
import type { SBreadcrumbProps } from './types'

const props = withDefaults(defineProps<SBreadcrumbProps>(), {
  items: () => [],
})
const p = useDefaults(props, 'SBreadcrumb')

defineSlots<{
  /** Custom separator between crumbs (an `SIcon` chevron by default). */
  separator?: (props: Record<string, never>) => unknown
}>()

const m = useMessages()

const lastIndex = computed(() => p.items.length - 1)
</script>

<template>
  <nav
    class="s-breadcrumb"
    :aria-label="p.ariaLabel ?? m.breadcrumb"
  >
    <div
      class="s-breadcrumb__list"
      role="list"
    >
      <div
        v-for="(item, i) in p.items"
        :key="i"
        class="s-breadcrumb__item"
        role="listitem"
      >
        <a
          v-if="item.href && i !== lastIndex"
          class="s-breadcrumb__link"
          :href="item.href"
        >
          <SIcon
            v-if="item.icon"
            :icon="item.icon"
            :size="16"
          />
          {{ item.label }}
        </a>
        <span
          v-else
          class="s-breadcrumb__current"
          :aria-current="i === lastIndex ? 'page' : undefined"
        >
          <SIcon
            v-if="item.icon"
            :icon="item.icon"
            :size="16"
          />
          {{ item.label }}
        </span>

        <span
          v-if="i !== lastIndex"
          class="s-breadcrumb__separator"
          aria-hidden="true"
        >
          <slot name="separator">
            <SIcon
              icon="chevron-right"
              :size="16"
            />
          </slot>
        </span>
      </div>
    </div>
  </nav>
</template>

<style src="./SBreadcrumb.scss" lang="scss"></style>
