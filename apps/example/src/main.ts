import { createApp } from 'vue'
/**
 * @smalt-ui/core is consumed the way a real user would: the built package + styles.
 * Components are not imported in templates and the `SUI` plugin is not installed;
 * auto-import provides them (the resolver is configured in vite.config.ts).
 */
import { registerIcons } from '@smalt-ui/core'
import '@smalt-ui/core/styles.css'
/**
 * Fonts are a separate entry: an app with its own fonts simply does not import it.
 * Here it also serves as a build check: a broken url() in dist/fonts.css would fail Vite.
 */
import '@smalt-ui/core/fonts.css'
// The @smalt-ui/core/icons subpath re-exports lucide, so lucide needs no separate install.
import { Rocket, Search, Trash2 } from '@smalt-ui/core/icons'
import App from './App.vue'

registerIcons({
  rocket: Rocket,
  search: Search,
  trash: Trash2,
})

createApp(App).mount('#app')
