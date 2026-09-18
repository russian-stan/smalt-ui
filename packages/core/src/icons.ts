/**
 * The `@smalt-ui/core/icons` subpath re-exports `lucide` so consumers get icons without installing
 * the package separately. The `[tag, attributes][]` format matches `SIconNode`, no adaptation
 * needed; `lucide` is marked `sideEffects: false`, so tree-shaking is preserved.
 * How to register icons: `apps/docs/guide/icons.md`.
 */
export * from 'lucide'
