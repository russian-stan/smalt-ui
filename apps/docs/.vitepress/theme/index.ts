import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { SUI } from '@smalt-ui/core'
import '@smalt-ui/core/styles.css'
import '@smalt-ui/core/fonts.css'
import './style.css'

import Layout from './Layout.vue'
import Demo from './Demo.vue'
import ApiTable from './ApiTable.vue'
import Playground from './Playground.vue'
import ThemeShowcase from './ThemeShowcase.vue'
import TypographyShowcase from './TypographyShowcase.vue'
import SpacingShowcase from './SpacingShowcase.vue'
import GridShowcase from './GridShowcase.vue'
import PaletteShowcase from './PaletteShowcase.vue'
import ShapeShowcase from './ShapeShowcase.vue'
import IconShowcase from './IconShowcase.vue'
import ElevationShowcase from './ElevationShowcase.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(SUI)
    app.component('Demo', Demo)
    app.component('ApiTable', ApiTable)
    app.component('Playground', Playground)
    app.component('ThemeShowcase', ThemeShowcase)
    app.component('TypographyShowcase', TypographyShowcase)
    app.component('SpacingShowcase', SpacingShowcase)
    app.component('GridShowcase', GridShowcase)
    app.component('PaletteShowcase', PaletteShowcase)
    app.component('ShapeShowcase', ShapeShowcase)
    app.component('IconShowcase', IconShowcase)
    app.component('ElevationShowcase', ElevationShowcase)
  },
} satisfies Theme
