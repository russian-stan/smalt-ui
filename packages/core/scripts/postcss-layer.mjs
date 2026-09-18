/**
 * Wraps component CSS in the `smalt.components` layer: `vite-plugin-lib-inject-css` puts it in the
 * JS chunk, so it lands after the app's global CSS and would win every specificity tie. The docs
 * use the plugin too, otherwise the dev cascade would differ from the published package.
 */
const LAYER_NAME = 'smalt.components'
const LAYER_ORDER = 'smalt.tokens, smalt.base, smalt.components, smalt.utilities'

export function postcssSUILayer() {
  return {
    postcssPlugin: 'smalt-layer',
    OnceExit(root, { AtRule }) {
      // An already wrapped file (the global styles.css) is left alone.
      if (root.nodes.some((node) => node.type === 'atrule' && node.name === 'layer')) return

      const moved = root.nodes.filter(
        (node) => !(node.type === 'atrule' && ['charset', 'import', 'use'].includes(node.name)),
      )
      if (!moved.length) return

      const layer = new AtRule({ name: 'layer', params: LAYER_NAME })
      moved.forEach((node) => layer.append(node.remove()))

      /**
       * The layer order is declared in every file: which one reaches the document first is not
       * known in advance, and priority depends on the first occurrence. Repeating the
       * declaration is harmless; the browser takes it into account once.
       */
      root.prepend(new AtRule({ name: 'layer', params: LAYER_ORDER }))
      root.append(layer)
    },
  }
}

postcssSUILayer.postcss = true
