# Menubar

`SMenubar` is a horizontal application menu bar (like "File / Edit / View"). It is built on
Reka UI (the `menubar` role, arrow-key navigation between menus, portaled dropdown panels). Menus
are set with the `menus` prop (a label + items); items work as in `SDropdownMenu`
(item/separator/label, icons via `SIcon`). Choosing an item emits `select`.

## Basic usage

<ClientOnly>
<Demo>
  <SMenubar
    aria-label="Main menu"
    :menus="[
      {
        label: 'File',
        items: [
          { label: 'New', value: 'new' },
          { label: 'Open…', value: 'open' },
          { type: 'separator' },
          {
            label: 'Quit',
            value: 'quit',
            danger: true
          }
        ],
      },
      {
        label: 'Edit',
        items: [
          { label: 'Copy', value: 'copy' },
          { label: 'Paste', value: 'paste' }
        ],
      },
      { label: 'View', items: [{ label: 'Full screen', value: 'fullscreen' }] }
    ]"
  />

<template #code>

```vue
<template>
  <SMenubar
    aria-label="Main menu"
    :menus="[
      { label: 'File', items: [{ label: 'Open…', value: 'open' }] },
      { label: 'Edit', items: [{ label: 'Copy', value: 'copy' }] },
    ]"
    @select="onSelect"
  />
</template>
```

  </template>
</Demo>
</ClientOnly>

## Item icons

The `icon` field of a menu item draws a leading icon via `SIcon` (a registry name or a raw path).

<ClientOnly>
<Demo>
  <SMenubar
    aria-label="Main menu"
    :menus="[
      {
        label: 'File',
        items: [
          { label: 'New', value: 'new', icon: 'plus' },
          { label: 'Open…', value: 'open', icon: 'folder' },
          { type: 'separator' },
          {
            label: 'Quit',
            value: 'quit',
            icon: 'log-out',
            danger: true
          }
        ],
      },
      {
        label: 'Edit',
        items: [
          { label: 'Copy', value: 'copy', icon: 'copy' },
          { label: 'Delete', value: 'delete', icon: 'trash-2' }
        ],
      }
    ]"
  />

<template #code>

```vue
<template>
  <SMenubar
    aria-label="Main menu"
    :menus="[
      {
        label: 'File',
        items: [
          { label: 'New', value: 'new', icon: 'plus' },
          { label: 'Open…', value: 'open', icon: 'folder' },
        ],
      },
      {
        label: 'Edit',
        items: [{ label: 'Copy', value: 'copy', icon: 'copy' }],
      },
    ]"
    @select="onSelect"
  />
</template>
```

  </template>
</Demo>
</ClientOnly>

## API

<ApiTable name="SMenubar" />
