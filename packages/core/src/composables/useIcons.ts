/**
 * Registry of named icons: `SIcon` and components with an `icon` prop resolve a string name to SVG
 * through it. Names match Lucide names so extra icons register under the same keys.
 * Module-level singleton (like the `useToast` queue): one per app, does not touch the DOM.
 * How to extend it: `apps/docs/guide/icons.md`.
 */
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bookmark,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  CircleX,
  Clock,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Filter,
  Folder,
  Heart,
  Home,
  Info,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Minus,
  Moon,
  MoreHorizontal,
  Package,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Sun,
  Tag,
  Trash2,
  TriangleAlert,
  Upload,
  User,
  Users,
  X,
} from 'lucide'

/**
 * Icon data: an array of `[tag, attributes]` nodes, e.g. `[['path', { d: 'm6 9 6 6 6-6' }]]`.
 * Matches the `IconNode` type of the `lucide` package, so its icons go into `registerIcons`
 * without adaptation.
 */
export type SIconNode = Array<[tag: string, attrs: Record<string, string | number | undefined>]>

/**
 * Built-in set: common `lucide` icons available by name without registration. Includes the names
 * the components use themselves (chevrons, check, plus/minus, status icons…).
 * To add or remove a built-in icon, edit only this object.
 */
const BUILTIN_ICONS: Record<string, SIconNode> = {
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  check: Check,
  x: X,
  plus: Plus,
  minus: Minus,
  menu: Menu,
  'more-horizontal': MoreHorizontal,
  'external-link': ExternalLink,
  search: Search,
  filter: Filter,
  settings: Settings,
  pencil: Pencil,
  'trash-2': Trash2,
  copy: Copy,
  download: Download,
  upload: Upload,
  'refresh-cw': RefreshCw,
  mail: Mail,
  calendar: Calendar,
  clock: Clock,
  bell: Bell,
  user: User,
  users: Users,
  home: Home,
  'file-text': FileText,
  folder: Folder,
  eye: Eye,
  'eye-off': EyeOff,
  lock: Lock,
  'log-out': LogOut,
  heart: Heart,
  bookmark: Bookmark,
  star: Star,
  tag: Tag,
  package: Package,
  'map-pin': MapPin,
  phone: Phone,
  'credit-card': CreditCard,
  'shopping-cart': ShoppingCart,
  sun: Sun,
  moon: Moon,
  info: Info,
  'circle-check': CircleCheck,
  'circle-alert': CircleAlert,
  'triangle-alert': TriangleAlert,
  'circle-x': CircleX,
  'circle-help': CircleHelp,
}

const registry = new Map<string, SIconNode>(Object.entries(BUILTIN_ICONS))

/**
 * Register icons under names. Existing names are overwritten, so a consumer can replace a built-in
 * icon too (e.g. swap `chevron-down` for their own).
 */
export function registerIcons(icons: Record<string, SIconNode>): void {
  for (const [name, node] of Object.entries(icons)) registry.set(name, node)
}

/** Look up an icon by name. Returns `undefined` if the name is not registered. */
export function resolveIcon(name: string): SIconNode | undefined {
  return registry.get(name)
}

/** Icon registry access as a composable, consistent with the other `use*` functions. */
export function useIcons(): {
  registerIcons: typeof registerIcons
  resolveIcon: typeof resolveIcon
} {
  return { registerIcons, resolveIcon }
}
