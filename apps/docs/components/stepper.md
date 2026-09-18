# Stepper

`SStepper` shows progress through a sequence of steps (checkout, a setup wizard). The active
step is highlighted, completed ones are marked with a check. It is controlled with `v-model`
(the step number, starting at 1); the indicators are clickable and support arrow-key navigation —
Reka handles focus and ARIA. The orientation is horizontal or vertical, and the step label can sit
on any of the four sides of the indicator (`label-placement`).

## Basic usage

<script setup>
import { ref } from 'vue'
const step = ref(2)
const stepV = ref(1)
const stepIcon = ref(2)
const stepLinear = ref(1)
const items = [
  { title: 'Shipping', description: 'Address and method' },
  { title: 'Payment', description: 'Card or invoice' },
  { title: 'Confirmation', description: 'Review your order' },
]
const linearItems = [
  ...items,
  { title: 'Card payment', description: 'Unavailable', disabled: true },
]
const iconItems = [
  { title: 'Account', description: 'Profile details', icon: 'user' },
  { title: 'Payment', description: 'Card or invoice', icon: 'credit-card' },
  { title: 'Done', description: 'Order placed', icon: 'circle-check' },
]
</script>

<Demo>
  <SStepper v-model="step" :items="items" />

<template #code>

```vue
<script setup>
import { ref } from 'vue'
const step = ref(2)
const items = [
  { title: 'Shipping', description: 'Address and method' },
  { title: 'Payment', description: 'Card or invoice' },
  { title: 'Confirmation', description: 'Review your order' },
]
</script>

<template>
  <SStepper
    v-model="step"
    :items="items"
  />
</template>
```

  </template>
</Demo>

## Vertical orientation

<Demo>
  <SStepper v-model="stepV" :items="items" orientation="vertical" />

<template #code>

```vue
<template>
  <SStepper
    v-model="step"
    :items="items"
    orientation="vertical"
  />
</template>
```

  </template>
</Demo>

## Label placement

`label-placement` sets the side of the indicator where the title and description go: `top` and
`bottom` put them above and below the circle, `start` and `end` before and after it (left and
right in a left-to-right layout). The prop works in both orientations, and the default depends on
the orientation: a horizontal stepper puts the label below, a vertical one to the right. With a
side label the step becomes a row, and the connector becomes a link between steps.

### Horizontal layout

<Demo>
  <div style="display: flex; flex-direction: column; gap: 28px; width: 100%">
    <SStepper :model-value="2" :items="items" label-placement="bottom" />
    <SSeparator />
    <SStepper :model-value="2" :items="items" label-placement="top" />
    <SSeparator />
    <SStepper :model-value="2" :items="items" label-placement="end" style="padding-block: 24px" />
    <SSeparator />
    <SStepper :model-value="2" :items="items" label-placement="start" style="padding-block: 24px" />
  </div>

<template #code>

```vue
<template>
  <SStepper
    v-model="step"
    :items="items"
    label-placement="bottom"
  />
  <SStepper
    v-model="step"
    :items="items"
    label-placement="top"
  />
  <SStepper
    v-model="step"
    :items="items"
    label-placement="end"
  />
  <SStepper
    v-model="step"
    :items="items"
    label-placement="start"
  />
</template>
```

  </template>
</Demo>

### Vertical: beside the indicator

On the left is `end`, the default for the vertical layout; on the right is `start`: the circles
move to the right edge and the labels to the left.

<Demo>
  <div style="display: flex; gap: 32px; width: 100%">
    <div style="flex: 1 1 0">
      <SStepper
        :model-value="2"
        :items="items"
        orientation="vertical"
        label-placement="end"
        style="width: fit-content"
      />
    </div>
    <SSeparator orientation="vertical" />
    <div style="flex: 1 1 0">
      <SStepper
        :model-value="2"
        :items="items"
        orientation="vertical"
        label-placement="start"
        style="width: fit-content"
      />
    </div>
  </div>

<template #code>

```vue
<template>
  <SStepper
    v-model="step"
    :items="items"
    orientation="vertical"
    label-placement="end"
  />
  <SStepper
    v-model="step"
    :items="items"
    orientation="vertical"
    label-placement="start"
  />
</template>
```

  </template>
</Demo>

### Vertical: above and below the indicator

The step becomes a centered column, as in the horizontal layout: the label is centered on the
circle, and the circles and connectors stay on one axis even when labels differ in width.

<Demo>
  <div style="display: flex; gap: 32px; width: 100%">
    <SStepper
      :model-value="2"
      :items="items"
      orientation="vertical"
      label-placement="top"
      style="flex: 1 1 0"
    />
    <SSeparator orientation="vertical" />
    <SStepper
      :model-value="2"
      :items="items"
      orientation="vertical"
      label-placement="bottom"
      style="flex: 1 1 0"
    />
  </div>

<template #code>

```vue
<template>
  <SStepper
    v-model="step"
    :items="items"
    orientation="vertical"
    label-placement="top"
  />
  <SStepper
    v-model="step"
    :items="items"
    orientation="vertical"
    label-placement="bottom"
  />
</template>
```

  </template>
</Demo>

## Responsive layout

A horizontal stepper needs room: at a narrow width the labels shrink until they wrap by words, and
beyond that the steps no longer fit. `stack-at` sets a width in pixels below which the stepper
switches to vertical — arrow-key navigation and `data-orientation` change together with the
orientation, so this is a real layout change, not a CSS rotation.

The threshold is compared with the width of **the stepper itself**, not the window: in a side
column or a modal it gets cramped even on a wide screen, where a media query would notice nothing.
Without the prop the layout never changes.

<Demo>
  <SStepper :model-value="2" :items="items" :stack-at="640" />

<template #code>

```vue
<template>
  <SStepper
    v-model="step"
    :items="items"
    :stack-at="640"
  />
</template>
```

  </template>
</Demo>

To check it, narrow the browser window: below 640px this stepper becomes vertical.

`narrow-orientation` sets the orientation below the threshold (`vertical` by default). Combined
with `orientation="vertical"` it gives the reverse layout: a column where there is room — for
example, in a side column of a form — and a row above the form when space is tight. Below 480px
this stepper turns into a row.

<Demo>
  <SStepper :model-value="2" :items="items" orientation="vertical" :stack-at="480" narrow-orientation="horizontal" style="width: 100%" />

<template #code>

```vue
<template>
  <SStepper
    v-model="step"
    :items="items"
    orientation="vertical"
    :stack-at="480"
    narrow-orientation="horizontal"
  />
</template>
```

  </template>
</Demo>

## Step icons

The `icon` field of a step replaces the number in the indicator, and `done-icon` sets the icon of
a completed step (both take a registry name or a raw path).

<Demo>
  <SStepper v-model="stepIcon" :items="iconItems" done-icon="check" />

<template #code>

```vue
<script setup>
import { ref } from 'vue'
const step = ref(2)
const items = [
  { title: 'Account', description: 'Profile details', icon: 'user' },
  { title: 'Payment', description: 'Card or invoice', icon: 'credit-card' },
  { title: 'Done', description: 'Order placed', icon: 'circle-check' },
]
</script>

<template>
  <SStepper
    v-model="step"
    :items="items"
    done-icon="check"
  />
</template>
```

  </template>
</Demo>

## Linear mode

`linear` requires going through the steps strictly in order — you cannot jump ahead to an
unfinished step (the indicators of future steps are not clickable). Unavailable steps are not
dimmed, though: the stepper works as a table of contents, and the names of future steps must stay
readable. Only a step explicitly disabled with the `disabled` field is dimmed.

<Demo>
  <SStepper v-model="stepLinear" :items="linearItems" linear style="width: 100%" />

<template #code>

```vue
<script setup>
import { ref } from 'vue'
const step = ref(1)
const items = [
  { title: 'Shipping', description: 'Address and method' },
  { title: 'Payment', description: 'Card or invoice' },
  { title: 'Confirmation', description: 'Review your order' },
]
</script>

<template>
  <SStepper
    v-model="step"
    :items="[...items, { title: 'Card payment', description: 'Unavailable', disabled: true }]"
    linear
  />
</template>
```

  </template>
</Demo>

## Color

The `color` prop sets the color of the active/completed step and the connector from the
[palette](/style/palette). By default the current step gets a pale background with an accent
border; `active-variant="filled"` fills it with the accent, like completed steps.

<Demo>
  <div style="display: flex; flex-direction: column; gap: 28px; width: 100%">
    <SStepper :model-value="2" :items="items" color="indigo" />
    <SSeparator />
    <SStepper :model-value="2" :items="items" active-variant="filled" />
  </div>

<template #code>

```vue
<template>
  <SStepper
    v-model="step"
    :items="items"
    color="indigo"
  />
  <SStepper
    v-model="step"
    :items="items"
    active-variant="filled"
  />
</template>
```

  </template>
</Demo>

## API

<ApiTable name="SStepper" />
