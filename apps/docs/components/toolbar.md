# Toolbar

`SToolbar` groups related actions (buttons, toggles) into a single panel with the `toolbar` role.
Arrow keys move focus between the items (roving focus), so the whole panel takes one Tab stop.
Separate groups with `SSeparator`.

## Basic usage

<Demo>
  <ClientOnly>
    <SToolbar aria-label="Formatting">
      <SButton variant="ghost" size="sm">Bold</SButton>
      <SButton variant="ghost" size="sm">Italic</SButton>
      <SButton variant="ghost" size="sm">Underline</SButton>
      <SSeparator orientation="vertical" style="height: 20px" />
      <SButton variant="ghost" size="sm">Link</SButton>
    </SToolbar>
  </ClientOnly>

<template #code>

```vue
<template>
  <SToolbar aria-label="Formatting">
    <SButton
      variant="ghost"
      size="sm"
    >
      Bold
    </SButton>
    <SButton
      variant="ghost"
      size="sm"
    >
      Italic
    </SButton>
    <SSeparator
      orientation="vertical"
      style="height: 20px"
    />
    <SButton
      variant="ghost"
      size="sm"
    >
      Link
    </SButton>
  </SToolbar>
</template>
```

  </template>
</Demo>

## Vertical toolbar

<Demo>
  <ClientOnly>
    <SToolbar orientation="vertical" aria-label="Tools">
      <SButton variant="ghost" size="sm">Select</SButton>
      <SButton variant="ghost" size="sm">Brush</SButton>
      <SButton variant="ghost" size="sm">Eraser</SButton>
    </SToolbar>
  </ClientOnly>

<template #code>

```vue
<template>
  <SToolbar
    orientation="vertical"
    aria-label="Tools"
  >
    <SButton
      variant="ghost"
      size="sm"
    >
      Select
    </SButton>
    <SButton
      variant="ghost"
      size="sm"
    >
      Brush
    </SButton>
    <SButton
      variant="ghost"
      size="sm"
    >
      Eraser
    </SButton>
  </SToolbar>
</template>
```

  </template>
</Demo>

## Elevation

The toolbar sits at the first elevation level. `flat` presses it to the page, `elevation` raises
it higher — see [Elevation](/style/elevation).

<Demo>
  <div style="display: grid; gap: 16px; width: 100%">
    <SToolbar flat>
      <SButton variant="ghost" size="sm" icon="pencil" aria-label="Edit" />
      <SButton variant="ghost" size="sm" icon="trash-2" aria-label="Delete" />
    </SToolbar>
    <SToolbar :elevation="3">
      <SButton variant="ghost" size="sm" icon="pencil" aria-label="Edit" />
      <SButton variant="ghost" size="sm" icon="trash-2" aria-label="Delete" />
    </SToolbar>
  </div>

<template #code>

```vue
<template>
  <SToolbar flat>
    <SButton
      variant="ghost"
      icon="pencil"
      aria-label="Edit"
    />
  </SToolbar>
</template>
```

  </template>
</Demo>

## API

<ApiTable name="SToolbar" />
