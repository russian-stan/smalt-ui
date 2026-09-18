<script setup lang="ts">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { SIcon } from '../SIcon'
import { useColorProp, useDefaults } from '../../composables'
import type { STabsProps } from './types'

const props = withDefaults(defineProps<STabsProps>(), {
  orientation: 'horizontal',
})
const p = useDefaults(props, 'STabs')

const colorStyle = useColorProp(p, 's-tabs')

defineSlots<{
  /**
   * Tab content: the slot name matches the `value` of its item
   * (`<template #overview>` for `{ value: 'overview' }`).
   */
  [value: string]: (props: Record<string, never>) => unknown
}>()

/** Value of the active tab. Two-way binding via `v-model`. */
const model = defineModel<string>()
</script>

<template>
  <TabsRoot
    v-model="model"
    class="s-tabs"
    :class="`s-tabs--${p.orientation}`"
    :style="colorStyle"
    :orientation="p.orientation"
  >
    <TabsList
      class="s-tabs__list"
      :aria-label="p.ariaLabel"
    >
      <TabsTrigger
        v-for="item in p.items"
        :key="item.value"
        class="s-tabs__trigger"
        :value="item.value"
        :disabled="item.disabled"
      >
        <SIcon
          v-if="item.icon"
          :icon="item.icon"
          :size="16"
        />
        {{ item.label }}
      </TabsTrigger>
    </TabsList>

    <TabsContent
      v-for="item in p.items"
      :key="item.value"
      class="s-tabs__content"
      :value="item.value"
    >
      <slot :name="item.value" />
    </TabsContent>
  </TabsRoot>
</template>

<style src="./STabs.scss" lang="scss"></style>
