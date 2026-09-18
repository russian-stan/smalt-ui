<script setup lang="ts">
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui'
import { useDefaults } from '../../composables'
import type { SSplitterProps } from './types'

const props = withDefaults(defineProps<SSplitterProps>(), {
  direction: 'horizontal',
})
const p = useDefaults(props, 'SSplitter')

defineSlots<{
  /** Panel content by the panel's name (`name` or `panel-<index>`). */
  [name: string]: (props: Record<string, never>) => unknown
}>()

const slotName = (index: number) => p.panels[index]?.name ?? `panel-${index}`
</script>

<template>
  <SplitterGroup
    :direction="p.direction"
    class="s-splitter"
    :class="`s-splitter--${p.direction}`"
  >
    <template
      v-for="(panel, index) in p.panels"
      :key="index"
    >
      <SplitterResizeHandle
        v-if="index > 0"
        class="s-splitter__handle"
      >
        <span
          class="s-splitter__grip"
          aria-hidden="true"
        />
      </SplitterResizeHandle>

      <SplitterPanel
        :default-size="panel.defaultSize"
        :min-size="panel.minSize"
        :max-size="panel.maxSize"
        :collapsible="panel.collapsible"
        class="s-splitter__panel"
      >
        <slot :name="slotName(index)" />
      </SplitterPanel>
    </template>
  </SplitterGroup>
</template>

<style src="./SSplitter.scss" lang="scss"></style>
