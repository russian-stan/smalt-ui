import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { postcssSUILayer } from './scripts/postcss-layer.mjs'

/**
 * .d.ts files are not built here: vue-tsc emits them (`build:types`), and the Sass CLI builds the
 * global styles.css (`build:styles`).
 */
export default defineConfig({
  // Without libInjectCss, a component chunk in lib mode does not import its CSS.
  plugins: [vue(), libInjectCss()],
  css: {
    /**
     * Component CSS goes into their JS chunks, so it reaches the document after the app's global
     * files and always wins at equal specificity. The `smalt.components` layer removes the
     * dependency on load order, see scripts/postcss-layer.mjs.
     */
    postcss: { plugins: [postcssSUILayer()] },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // The consumer's bundler minifies; minified ESM would lose readability and PURE annotations.
    minify: false,
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        icons: fileURLToPath(new URL('./src/icons.ts', import.meta.url)),
        resolver: fileURLToPath(new URL('./src/resolver.ts', import.meta.url)),
        'labs/index': fileURLToPath(new URL('./src/labs/index.ts', import.meta.url)),
        'color-mode-script': fileURLToPath(new URL('./src/color-mode-script.ts', import.meta.url)),
      },
      formats: ['es'],
    },
    cssCodeSplit: true,
    rolldownOptions: {
      external: ['vue', 'reka-ui', 'lucide', 'maska', 'maska/vue'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
})
