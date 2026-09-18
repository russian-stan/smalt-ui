# Color Picker

`SColorPicker` is a visual color picker in a popover panel: a 2D saturation/brightness area, a hue
slider (and optionally an alpha slider), preset swatches, and a hex field
([`SColorField`](./color-field)). The trigger shows the current color. It is built on `SPopover`;
the value is a hex string bound with `v-model`. The panel opens in a portal, so the demos are
wrapped in `<ClientOnly>`.

## Basic usage

<script setup>
import { ref } from 'vue'
const color = ref('#3B82F6')
const brand = ref('#8B5CF6')
const swatches = ['#EF4444', '#F59E0B', '#10B981']
</script>

<Demo>
  <ClientOnly>
    <div style="display: flex; align-items: center; gap: 16px">
      <SColorPicker v-model="color" label="Color" />
      <code>{{ color }}</code>
    </div>
  </ClientOnly>

<template #code>

```vue
<script setup>
import { ref } from 'vue'
const color = ref('#3B82F6')
</script>

<template>
  <SColorPicker
    v-model="color"
    label="Color"
  />
</template>
```

  </template>
</Demo>

## Alpha and presets

<Demo>
  <ClientOnly>
    <SColorPicker v-model="brand" label="Brand color" with-alpha :swatches="swatches" />
  </ClientOnly>

<template #code>

```vue
<script setup>
const swatches = ['#EF4444', '#F59E0B', '#10B981']
</script>

<template>
  <SColorPicker
    v-model="color"
    label="Brand color"
    with-alpha
    :swatches="swatches"
  />
</template>
```

  </template>
</Demo>

## Without the input

The `hideInput` flag hides the hex field in the panel, leaving only the saturation area, the hue
slider, and the swatches.

<Demo>
  <ClientOnly>
    <SColorPicker v-model="color" label="Color" hide-input />
  </ClientOnly>

<template #code>

```vue
<script setup>
import { ref } from 'vue'
const color = ref('#3B82F6')
</script>

<template>
  <SColorPicker
    v-model="color"
    label="Color"
    hide-input
  />
</template>
```

  </template>
</Demo>

## Disabled

`disabled` locks the trigger: the panel does not open and the color cannot be changed.

<Demo>
  <ClientOnly>
    <SColorPicker v-model="color" label="Color" disabled />
  </ClientOnly>

<template #code>

```vue
<template>
  <SColorPicker
    v-model="color"
    label="Color"
    disabled
  />
</template>
```

  </template>
</Demo>

## API

<ApiTable name="SColorPicker" />
