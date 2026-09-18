# Skeleton

`SSkeleton` is a loading placeholder: it fills the space of upcoming content with a shimmering
gray block, which makes the delay feel shorter. Pure CSS with no dependencies; the element is
decorative (`aria-hidden`), so duplicate the loading status as text nearby for screen readers.

## Shapes

<Demo>
  <div style="display: flex; align-items: center; gap: 16px; width: 100%">
    <SSkeleton variant="circle" :width="48" :height="48" />
    <div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
      <SSkeleton variant="text" width="40%" />
      <SSkeleton variant="text" width="80%" />
    </div>
  </div>

<template #code>

```vue
<template>
  <SSkeleton
    variant="circle"
    :width="48"
    :height="48"
  />
  <SSkeleton
    variant="text"
    width="40%"
  />
  <SSkeleton
    variant="rect"
    width="100%"
    :height="120"
  />
</template>
```

  </template>
</Demo>

## Placeholder card

<Demo>
  <div style="width: 260px; display: flex; flex-direction: column; gap: 12px">
    <SSkeleton variant="rect" width="100%" :height="140" />
    <SSkeleton variant="text" width="70%" />
    <SSkeleton variant="text" width="90%" />
    <SSkeleton variant="text" width="50%" />
  </div>

<template #code>

```vue
<template>
  <SSkeleton
    variant="rect"
    width="100%"
    :height="140"
  />
  <SSkeleton
    variant="text"
    width="70%"
  />
  <SSkeleton
    variant="text"
    width="90%"
  />
</template>
```

  </template>
</Demo>

## Without animation

<Demo>
  <SSkeleton variant="rect" width="200px" :height="32" :animated="false" />

<template #code>

```vue
<template>
  <SSkeleton
    variant="rect"
    width="200px"
    :height="32"
    :animated="false"
  />
</template>
```

  </template>
</Demo>

## API

<ApiTable name="SSkeleton" />
