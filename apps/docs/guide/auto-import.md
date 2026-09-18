# Component auto-import

In Nuxt, auto-import comes from the `@smalt-ui/nuxt` module, see [Nuxt](/guide/nuxt). In a plain
Vite + Vue project the same job is done by a resolver for `unplugin-vue-components`.

## Installation

```bash
pnpm add -D unplugin-vue-components
```

## Setup

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { SUIResolver } from '@smalt-ui/core/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [SUIResolver()],
    }),
  ],
})
```

Components are then available in templates without imports:

```vue
<template>
  <SButton variant="primary">Done</SButton>
</template>
```

Component styles come along with the components (injected into chunks at build time), while the
global tokens and base styles are imported once in the app entry point:

```ts
import '@smalt-ui/core/styles.css'
```

## Prefix

If the project needs its own name prefix, set it for both the resolver and the templates:

```ts
Components({ resolvers: [SUIResolver({ prefix: 'App' })] })
```

```vue
<template>
  <AppSButton>Done</AppSButton>
</template>
```

## Verified in the repository

The `apps/example` app is set up exactly this way: its templates import no components and the
`SUI` plugin is not used. It is a working reference configuration.

## What is not resolved

`ConfigProvider` is an infrastructure provider with an "explicit import only" policy: you import
it by hand so that the app configuration stays visible in code.

```ts
import { ConfigProvider } from '@smalt-ui/core'
```
