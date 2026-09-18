# Tree

`STree` shows a hierarchy of nodes (a file tree, nested categories) with expandable branches
and selection. It is fully keyboard operable (arrow keys navigate and expand, `Enter`/`Space`
select), and Reka handles the `tree`/`treeitem` roles and focus. The data is a recursive `items`
array; the selected node is available through `v-model`.

## Basic usage

<script setup>
import { ref } from 'vue'
const folder = 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z'
const file = 'M6 2h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z'
const items = [
  {
    label: 'src',
    value: 'src',
    icon: folder,
    children: [
      {
        label: 'components',
        value: 'components',
        icon: folder,
        children: [
          {
            label: 'Button.vue',
            value: 'button',
            icon: file
          },
          {
            label: 'Input.vue',
            value: 'input',
            icon: file
          }
        ],
      },
      {
        label: 'main.ts',
        value: 'main',
        icon: file
      }
    ],
  },
  {
    label: 'package.json',
    value: 'pkg',
    icon: file
  }
]
const selected = ref()
const namedItems = [
  {
    label: 'src',
    value: 'src',
    icon: 'folder',
    children: [
      {
        label: 'main.ts',
        value: 'main',
        icon: 'file-text',
      },
      {
        label: 'App.vue',
        value: 'app',
        icon: 'file-text',
      },
    ],
  },
  {
    label: 'package.json',
    value: 'pkg',
    icon: 'file-text',
  },
]
const selectedNamed = ref()
const selectedMulti = ref([])
</script>

<Demo>
  <ClientOnly>
    <STree v-model="selected" :items="items" :default-expanded="['src']" style="max-width: 280px" />
  </ClientOnly>

<template #code>

```vue
<script setup>
import { ref } from 'vue'
const items = [
  {
    label: 'src',
    value: 'src',
    icon: folderPath,
    children: [
      {
        label: 'main.ts',
        value: 'main',
        icon: filePath,
      },
    ],
  },
  {
    label: 'package.json',
    value: 'pkg',
    icon: filePath,
  },
]
const selected = ref()
</script>

<template>
  <STree
    v-model="selected"
    :items="items"
    :default-expanded="['src']"
  />
</template>
```

  </template>
</Demo>

## Node icons

The `icon` field of a node takes a name from the built-in registry (e.g. `folder`,
`file-text`), so there is no need to store raw SVG paths.

<Demo>
  <ClientOnly>
    <STree v-model="selectedNamed" :items="namedItems" :default-expanded="['src']" style="max-width: 280px" />
  </ClientOnly>

<template #code>

```vue
<script setup>
import { ref } from 'vue'
const items = [
  {
    label: 'src',
    value: 'src',
    icon: 'folder',
    children: [
      {
        label: 'main.ts',
        value: 'main',
        icon: 'file-text',
      },
    ],
  },
  {
    label: 'package.json',
    value: 'pkg',
    icon: 'file-text',
  },
]
const selected = ref()
</script>

<template>
  <STree
    v-model="selected"
    :items="items"
    :default-expanded="['src']"
  />
</template>
```

  </template>
</Demo>

## Multiple selection

`multiple` allows selecting several nodes at once — `v-model` then holds an array of the
selected nodes (select them by clicking or with `Ctrl`/`Shift`).

<Demo>
  <ClientOnly>
    <STree v-model="selectedMulti" :items="namedItems" multiple :default-expanded="['src']" style="max-width: 280px" />
  </ClientOnly>

<template #code>

```vue
<script setup>
import { ref } from 'vue'
const selected = ref([])
</script>

<template>
  <STree
    v-model="selected"
    :items="items"
    multiple
    :default-expanded="['src']"
  />
</template>
```

  </template>
</Demo>

## API

<ApiTable name="STree" />
