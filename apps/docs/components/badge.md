# Badge

`SBadge` is a compact status label (a counter, tag, or state). Plain CSS on semantic tokens, no
dependencies.

## Variants

<Demo>
  <SBadge variant="neutral">Neutral</SBadge>
  <SBadge variant="primary">Primary</SBadge>
  <SBadge variant="positive">Positive</SBadge>
  <SBadge variant="warning">Warning</SBadge>
  <SBadge variant="negative">Negative</SBadge>

<template #code>

```vue
<template>
  <SBadge variant="neutral">Neutral</SBadge>
  <SBadge variant="primary">Primary</SBadge>
  <SBadge variant="positive">Positive</SBadge>
  <SBadge variant="warning">Warning</SBadge>
  <SBadge variant="negative">Negative</SBadge>
</template>
```

  </template>
</Demo>

## Sizes

<Demo>
  <SBadge size="sm">sm</SBadge>
  <SBadge size="md">md</SBadge>

<template #code>

```vue
<template>
  <SBadge size="sm">sm</SBadge>
  <SBadge size="md">md</SBadge>
</template>
```

  </template>
</Demo>

## Color

The `color` prop sets a color from the [palette](/style/palette) (`primary`, `teal`, `teal-10`) and
overrides the variant color. The filled `primary` variant also accepts `text-color`; for the soft
variants the color applies to both the tint and the text.

<Demo>
  <SBadge variant="primary" color="teal">teal</SBadge>
  <SBadge variant="primary" color="deep-purple">deep-purple</SBadge>
  <SBadge variant="positive" color="indigo">soft indigo</SBadge>
  <SBadge variant="primary" color="light-blue-3" text-color="dark">light-blue-3</SBadge>

<template #code>

```vue
<template>
  <SBadge
    variant="primary"
    color="teal"
  >
    teal
  </SBadge>
  <SBadge
    variant="primary"
    color="deep-purple"
  >
    deep-purple
  </SBadge>
  <SBadge
    variant="positive"
    color="indigo"
  >
    soft indigo
  </SBadge>
  <SBadge
    variant="primary"
    color="light-blue-3"
    text-color="dark"
  >
    light-blue-3
  </SBadge>
</template>
```

  </template>
</Demo>

## Icons

`icon` renders a leading icon, `icon-right` a trailing one (registry names).

<Demo>
  <SBadge variant="positive" icon="check">Done</SBadge>
  <SBadge variant="neutral" icon-right="x">Draft</SBadge>

<template #code>

```vue
<template>
  <SBadge
    variant="positive"
    icon="check"
  >
    Done
  </SBadge>
  <SBadge
    variant="neutral"
    icon-right="x"
  >
    Draft
  </SBadge>
</template>
```

  </template>
</Demo>

## API

<ApiTable name="SBadge" />
