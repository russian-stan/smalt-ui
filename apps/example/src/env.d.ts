/**
 * Shim for SFCs and side-effect style imports: without it the editor's TS server does not resolve
 * `import App from './App.vue'` and `import '@smalt-ui/core/styles.css'`.
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module '*.css'
