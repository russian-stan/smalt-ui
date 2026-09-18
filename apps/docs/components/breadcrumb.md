# Breadcrumb

`SBreadcrumb` is a navigation trail from the root to the current page. Plain CSS on semantic markup
(`nav > ol`): intermediate crumbs are links, the last one is marked `aria-current="page"`. The
separator is a reusable `SIcon` (replace it with your own through the `#separator` slot).

## Basic usage

<Demo>
  <SBreadcrumb
    :items="[
      { label: 'Home', href: '/' },
      { label: 'Catalog', href: '#' },
      { label: 'Smartphones', href: '#' },
      { label: 'iPhone 15' },
    ]"
  />

<template #code>

```vue
<template>
  <SBreadcrumb
    :items="[
      { label: 'Home', href: '/' },
      { label: 'Catalog', href: '#' },
      { label: 'Smartphones', href: '#' },
      { label: 'iPhone 15' },
    ]"
  />
</template>
```

  </template>
</Demo>

## Custom separator

<Demo>
  <SBreadcrumb
    :items="[
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '#' },
      { label: 'Profile' },
    ]"
  >
    <template #separator>/</template>
  </SBreadcrumb>

<template #code>

```vue
<template>
  <SBreadcrumb :items="items">
    <template #separator>/</template>
  </SBreadcrumb>
</template>
```

  </template>
</Demo>

## Icons

The item's `icon` field renders a leading icon for the crumb (a registry name or a raw path).

<Demo>
  <SBreadcrumb
    :items="[
      { label: 'Home', href: '/', icon: 'home' },
      { label: 'Settings', href: '#', icon: 'settings' },
      { label: 'Profile', icon: 'user' },
    ]"
  />

<template #code>

```vue
<template>
  <SBreadcrumb
    :items="[
      { label: 'Home', href: '/', icon: 'home' },
      { label: 'Settings', href: '#', icon: 'settings' },
      { label: 'Profile', icon: 'user' },
    ]"
  />
</template>
```

  </template>
</Demo>

## API

<ApiTable name="SBreadcrumb" />
