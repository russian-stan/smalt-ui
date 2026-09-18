<script setup>
import { ref } from 'vue'

const chips = ref(['Vue', 'Nuxt', 'Reka UI'])
const removeChip = (t) => {
  chips.value = chips.value.filter((x) => x !== t)
}
</script>

# Tag

`STag` is a reusable chip: a compact label with an optional remove button. It is composed on top
of [`SBadge`](/components/badge) (visuals) and [`SIcon`](/components/icon) (the cross). It is used
on its own and as the tag element inside [`SInput`](/components/input) (`use-tags`) and
[`SSelect`](/components/select) (`use-tags`).

## Variants

Inherits the `SBadge` palette: the neutral and semantic variants.

<Demo>
  <STag variant="neutral">Neutral</STag>
  <STag variant="primary">Primary</STag>
  <STag variant="positive">Positive</STag>
  <STag variant="warning">Warning</STag>
  <STag variant="negative">Negative</STag>

<template #code>

```vue
<template>
  <STag variant="primary">Primary</STag>
  <STag variant="positive">Positive</STag>
  <STag variant="negative">Negative</STag>
</template>
```

  </template>
</Demo>

## Sizes and icon

`size` is `sm` or `md`; `icon` draws a leading icon (a registry name).

<Demo>
  <STag size="sm">sm</STag>
  <STag size="md">md</STag>
  <STag icon="star" variant="warning">Favorite</STag>

<template #code>

```vue
<template>
  <STag size="sm">sm</STag>
  <STag size="md">md</STag>
  <STag
    icon="star"
    variant="warning"
  >
    Favorite
  </STag>
</template>
```

  </template>
</Demo>

## Removal

The `removable` flag adds a cross button; clicking it emits the `remove` event. The button's
accessible name comes from the locale dictionary (`removeTag`) or is set with the `remove-label`
prop.

<Demo>
  <div style="display: flex; gap: 8px; flex-wrap: wrap; min-height: 24px">
    <STag
      v-for="t in chips"
      :key="t"
      removable
      variant="primary"
      @remove="removeChip(t)"
    >
      {{ t }}
    </STag>
  </div>

<template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const chips = ref(['Vue', 'Nuxt', 'Reka UI'])
const removeChip = (t: string) => {
  chips.value = chips.value.filter((x) => x !== t)
}
</script>

<template>
  <STag
    v-for="t in chips"
    :key="t"
    removable
    variant="primary"
    @remove="removeChip(t)"
  >
    {{ t }}
  </STag>
</template>
```

  </template>
</Demo>

## Color

The `color` prop sets a color from the [palette](/style/palette) and overrides the variant color.

<Demo>
  <STag variant="primary" color="indigo">indigo</STag>
  <STag variant="primary" color="blue-grey">blue-grey</STag>
  <STag variant="positive" color="deep-purple">soft deep-purple</STag>
  <STag variant="primary" color="cyan">cyan</STag>

<template #code>

```vue
<template>
  <STag
    variant="primary"
    color="indigo"
  >
    indigo
  </STag>
  <STag
    variant="positive"
    color="deep-purple"
  >
    soft deep-purple
  </STag>
</template>
```

  </template>
</Demo>

## API

<ApiTable name="STag" />
