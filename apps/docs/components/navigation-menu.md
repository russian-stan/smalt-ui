# Navigation Menu

`SNavigationMenu` is horizontal site navigation with dropdown panels of links. It is built on
Reka UI (the `navigation` role, keyboard support, an animated viewport and indicator). Items are
set with the `items` prop: a direct link (`href`) or an expandable panel (`links` with a title and
description). The chevron is an `SIcon`.

## Basic usage

<ClientOnly>
<Demo>
  <div style="width: 100%; min-height: 240px">
  <SNavigationMenu
    aria-label="Main navigation"
    :items="[
      { label: 'Home', href: '/' },
      {
        label: 'Products',
        links: [
          {
            label: 'Analytics',
            href: '#',
            description: 'Reports and dashboards'
          },
          {
            label: 'CRM',
            href: '#',
            description: 'Customer management'
          },
          {
            label: 'Automation',
            href: '#',
            description: 'Workflows and triggers'
          },
          {
            label: 'Integrations',
            href: '#',
            description: 'API and webhooks'
          }
        ],
      },
      { label: 'Pricing', href: '#' }
    ]"
  />
  </div>

<template #code>

```vue
<template>
  <SNavigationMenu
    aria-label="Main navigation"
    :items="[
      { label: 'Home', href: '/' },
      {
        label: 'Products',
        links: [
          {
            label: 'Analytics',
            href: '#',
            description: 'Reports and dashboards',
          },
          {
            label: 'CRM',
            href: '#',
            description: 'Customer management',
          },
          {
            label: 'Automation',
            href: '#',
            description: 'Workflows and triggers',
          },
          {
            label: 'Integrations',
            href: '#',
            description: 'API and webhooks',
          },
        ],
      },
      { label: 'Pricing', href: '#' },
    ]"
  />
</template>
```

  </template>
</Demo>
</ClientOnly>

## API

<ApiTable name="SNavigationMenu" />
