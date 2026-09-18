<p align="center">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="apps/docs/public/logo-dark.svg"
    />
    <img
      src="apps/docs/public/logo.svg"
      alt="Smalt UI"
      width="220"
    />
  </picture>
</p>

# Smalt UI

UI library for **Vue 3** and **Nuxt** built on [Reka UI](https://reka-ui.com/) and design tokens.
A **pnpm** + **TypeScript** monorepo.

Smalt is colored glass that mosaics are assembled from, piece by piece. Smalt UI components work the
same way: an interface is put together from small, consistent parts on a shared token system.

```bash
pnpm add @smalt-ui/core
```

Versions follow [semver](https://semver.org/): breaking changes to the API, props and CSS classes
ship only in major releases.

## Monorepo layout

| Package / app                     | Purpose                                                          | README                                   |
| --------------------------------- | ---------------------------------------------------------------- | ---------------------------------------- |
| [`@smalt-ui/core`](packages/core) | UI components, tokens/themes, composables, providers             | [packages/core](packages/core/README.md) |
| [`@smalt-ui/nuxt`](packages/nuxt) | Nuxt module: component auto-import, styles, color mode, SSR      | [packages/nuxt](packages/nuxt/README.md) |
| [`docs`](apps/docs)               | Documentation site (VitePress): live demos, generated API tables | [apps/docs](apps/docs/README.md)         |
| [`example`](apps/example)         | Smoke-test consumer (Vite + Vue 3) and tree-shaking check        | [apps/example](apps/example/README.md)   |

## Requirements

- **Node** `>=22.12.0`
- **pnpm** `9.x` (the package manager; do not use npm/yarn, it is pinned in `packageManager`)

## Installation

```bash
pnpm install
```

Installs dependencies for all workspace packages and apps and sets up the git hooks.

## Commands (from the root)

| Command                        | Description                                              |
| ------------------------------ | -------------------------------------------------------- |
| `pnpm dev`                     | Documentation dev server (VitePress)                     |
| `pnpm build`                   | Build the published packages (`core` + `nuxt`)           |
| `pnpm build:docs`              | Build the documentation site                             |
| `pnpm test`                    | Unit and a11y tests in all packages (Vitest)             |
| `pnpm test:types`              | Type tests (`expectTypeOf`)                              |
| `pnpm test:visual`             | Visual regression (Playwright; builds core + docs first) |
| `pnpm test:visual:update`      | Regenerate the visual regression baselines               |
| `pnpm lint` · `pnpm lint:fix`  | ESLint (check / autofix)                                 |
| `pnpm format` · `format:check` | Prettier (write / check)                                 |
| `pnpm typecheck`               | Type check all packages (`vue-tsc`)                      |
| `pnpm changeset`               | New changeset (a description of changes for the release) |
| `pnpm release`                 | Build + publish the packages (Changesets)                |

Scripts specific to a package or app are listed in its own README.

## Development

- **Git hooks** (`simple-git-hooks` + `lint-staged`): pre-commit runs `eslint --fix` on the changed
  `*.{js,ts,mts,vue}` files and `prettier` on `*.{json,md,css,yaml,yml}`.
- **Formatting**: a single `.prettierrc.json` for code and documentation examples
  (`printWidth: 100`, `singleQuote`, `semi: false`, `singleAttributePerLine`).
- **Releases** go through [Changesets](https://github.com/changesets/changesets): add a changeset
  to a change (`pnpm changeset`), bump versions with `pnpm version-packages`, publish with
  `pnpm release` (publishes to npm, authentication from `~/.npmrc`).

## License

[MIT](LICENSE) © 2026 Stanislav Dyachenko. The vendored Inter font is distributed under the
[SIL Open Font License 1.1](packages/core/src/fonts/OFL.txt).
