<script setup lang="ts">
import { TreeRoot, TreeItem } from 'reka-ui'
import { SIcon } from '../SIcon'
import { useDefaults } from '../../composables'
import type { STreeProps, STreeItem } from './types'

const props = withDefaults(defineProps<STreeProps>(), {
  multiple: false,
})
const p = useDefaults(props, 'STree')

/** Selected node (or array of nodes with `multiple`). Two-way bound via `v-model`. */
const model = defineModel<STreeItem | STreeItem[]>()

const getKey = (item: STreeItem) => item.value ?? item.label
/**
 * Reka types items/getChildren as mutable even though the tree only reads them: the cast lets
 * the consumer's readonly data through.
 */
const getChildren = (item: STreeItem) => item.children as STreeItem[] | undefined
</script>

<template>
  <TreeRoot
    v-slot="{ flattenItems }"
    v-model="model"
    :items="p.items as STreeItem[]"
    :get-key="getKey"
    :get-children="getChildren"
    :multiple="p.multiple"
    :default-expanded="p.defaultExpanded"
    class="s-tree"
  >
    <TreeItem
      v-for="item in flattenItems"
      v-slot="{ isExpanded }"
      :key="item._id"
      v-bind="item.bind"
      :disabled="item.value.disabled"
      class="s-tree__item"
      :style="{
        paddingInlineStart: `calc(${item.level - 1} * var(--s-space-5) + var(--s-space-2))`,
      }"
    >
      <SIcon
        v-if="item.hasChildren"
        icon="chevron-right"
        class="s-tree__chevron"
        :class="{ 's-tree__chevron--expanded': isExpanded }"
        :size="16"
      />
      <span
        v-else
        class="s-tree__spacer"
        aria-hidden="true"
      />

      <SIcon
        v-if="item.value.icon"
        :icon="item.value.icon"
        class="s-tree__icon"
        :size="16"
      />

      <span class="s-tree__label">{{ item.value.label }}</span>
    </TreeItem>
  </TreeRoot>
</template>

<style src="./STree.scss" lang="scss"></style>
