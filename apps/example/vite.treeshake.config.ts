import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * Isolated build of the named import { SButton }, to check that unused components
 * (SSelect/SDialog) are removed by tree-shaking.
 */
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist-treeshake',
    minify: false,
    lib: {
      entry: 'src/only-button.ts',
      formats: ['es'],
      fileName: 'only-button',
    },
    rolldownOptions: {
      /**
       * lucide is external, as in the main core build (otherwise icons pulled in through
       * SIcon/the registry would be bundled and skew the size measurement).
       */
      external: ['vue', 'reka-ui', 'lucide'],
    },
  },
})
