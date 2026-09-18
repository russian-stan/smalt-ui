import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { SUIResolver } from '@smalt-ui/core/resolver'

/**
 * Smoke-test consumer of the library. Components come through auto-import
 * (`@smalt-ui/core/resolver` + unplugin-vue-components) rather than the `SUI` plugin: this checks
 * that the resolver actually works in a real build, while its unit test only sees the
 * "name → package" pair it returns.
 */
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [SUIResolver()],
      dts: 'src/components.d.ts',
    }),
  ],
})
