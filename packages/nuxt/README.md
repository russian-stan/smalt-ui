# @smalt-ui/nuxt

Nuxt module for [`@smalt-ui/core`](../core/README.md): component auto-import, styles, color mode
and SSR setup out of the box.

> Part of the **Smalt UI** monorepo. Shared requirements, installation and workspace commands are
> described in the [root README](../../README.md).

## Installation

```bash
pnpm add @smalt-ui/nuxt @smalt-ui/core
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@smalt-ui/nuxt'],
  sui: {
    // options (see below)
  },
})
```

The module registers the components for auto-import, includes `@smalt-ui/core/styles.css`, adds
the `.s-root` isolation container and sets up color mode. `reka-ui` is a peer dependency.

**Nuxt 3 and Nuxt 4** are supported: `@nuxt/kit` is declared with the `^3.0.0 || ^4.0.0` range, so
the module uses the app's kit instead of pulling in a second copy.

## Options (`sui` config key)

| Option      | Type                     | Default | Description                                                 |
| ----------- | ------------------------ | ------- | ----------------------------------------------------------- |
| `prefix`    | `string`                 | `''`    | Name prefix for auto-imported components                    |
| `css`       | `boolean`                | `true`  | Include the global `@smalt-ui/core/styles.css` styles       |
| `colorMode` | `boolean`                | `true`  | Enable light/dark control (`data-theme`)                    |
| `container` | `boolean`                | `true`  | Add the `.s-root` isolation class to the app root           |
| `locale`    | `'en'`                   | `'en'`  | Locale of the library strings (the only built-in one)       |
| `messages`  | `Record<string, string>` | —       | Override individual library strings, e.g. to translate them |

## Package scripts

| Script             | Description                                    |
| ------------------ | ---------------------------------------------- |
| `pnpm dev:prepare` | Stub + module type preparation for development |
| `pnpm build`       | Build the module (`nuxt-module-build`)         |

Run from the root: `pnpm --filter @smalt-ui/nuxt <script>`.
