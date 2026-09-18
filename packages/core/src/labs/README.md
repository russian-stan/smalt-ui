# labs

Experimental components. Rules:

- The component folder layout is the same as in `src/components/<Name>/` (SFC, `types.ts`,
  `index.ts`, `.scss`, `__tests__/`).
- Export it with an `export * from './SName'` line in `src/labs/index.ts`.
- It is **not** re-exported from the main `@smalt-ui/core`: consumers import from
  `@smalt-ui/core/labs` deliberately.
- The plugin registers it only with `createSUI({ labs: true })`.
- The requirements are the same as for a regular component: unit + a11y tests, SSR smoke test,
  JSDoc. Only API stability differs: the API can change without a deprecation cycle.
