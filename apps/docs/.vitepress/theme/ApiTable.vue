<script setup lang="ts">
import api from '../data/api.json'
import { tokenize, formatType, formatEventSignature, splitInlineCode } from './apiSyntax'

interface PropMeta {
  name: string
  type: string
  required: boolean
  default: string | null
  description: string
}
interface EventMeta {
  name: string
  type: string
  description: string
}
interface SlotMeta {
  name: string
  description: string
}
interface ComponentMeta {
  props: PropMeta[]
  events: EventMeta[]
  slots: SlotMeta[]
}

const props = defineProps<{ name: string }>()
const meta = (api as Record<string, ComponentMeta>)[props.name]
</script>

<template>
  <div
    v-if="meta"
    class="api"
  >
    <template v-if="meta.props.length">
      <h3>Props</h3>
      <div class="api__scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="p in meta.props"
              :key="p.name"
            >
              <td>
                <code
                  ><span class="tok tok--name">{{ p.name }}</span></code
                ><span
                  v-if="p.required"
                  class="api__req"
                  title="Required"
                  >*</span
                >
              </td>
              <td>
                <code :class="{ 'tok-pre': formatType(p.type).includes('\n') }"
                  ><span
                    v-for="(t, i) in tokenize(formatType(p.type))"
                    :key="i"
                    :class="`tok tok--${t.kind}`"
                    >{{ t.text }}</span
                  ></code
                >
              </td>
              <td>
                <code v-if="p.default !== null"
                  ><span
                    v-for="(t, i) in tokenize(p.default)"
                    :key="i"
                    :class="`tok tok--${t.kind}`"
                    >{{ t.text }}</span
                  ></code
                >
                <span
                  v-else-if="p.required"
                  class="api__muted"
                  >required</span
                >
                <code v-else>undefined</code>
              </td>
              <td>
                <template
                  v-for="(seg, si) in splitInlineCode(p.description)"
                  :key="si"
                  ><a
                    v-if="seg.href"
                    :href="seg.href"
                    >{{ seg.text }}</a
                  ><code v-else-if="seg.code"
                    ><span
                      v-for="(t, ti) in tokenize(seg.text)"
                      :key="ti"
                      :class="`tok tok--${t.kind}`"
                      >{{ t.text }}</span
                    ></code
                  ><template v-else>{{ seg.text }}</template></template
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <template v-if="meta.events.length">
      <h3>Events</h3>
      <div class="api__scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Signature</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="e in meta.events"
              :key="e.name"
            >
              <td>
                <code>{{ e.name }}</code>
              </td>
              <td>
                <code :class="{ 'tok-pre': formatEventSignature(e.type).includes('\n') }"
                  ><span
                    v-for="(t, i) in tokenize(formatEventSignature(e.type))"
                    :key="i"
                    :class="`tok tok--${t.kind}`"
                    >{{ t.text }}</span
                  ></code
                >
              </td>
              <td>
                <template
                  v-for="(seg, si) in splitInlineCode(e.description)"
                  :key="si"
                  ><a
                    v-if="seg.href"
                    :href="seg.href"
                    >{{ seg.text }}</a
                  ><code v-else-if="seg.code"
                    ><span
                      v-for="(t, ti) in tokenize(seg.text)"
                      :key="ti"
                      :class="`tok tok--${t.kind}`"
                      >{{ t.text }}</span
                    ></code
                  ><template v-else>{{ seg.text }}</template></template
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <template v-if="meta.slots.length">
      <h3>Slots</h3>
      <div class="api__scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="s in meta.slots"
              :key="s.name"
            >
              <td>
                <code>{{ s.name }}</code>
              </td>
              <td>
                <template
                  v-for="(seg, si) in splitInlineCode(s.description)"
                  :key="si"
                  ><a
                    v-if="seg.href"
                    :href="seg.href"
                    >{{ seg.text }}</a
                  ><code v-else-if="seg.code"
                    ><span
                      v-for="(t, ti) in tokenize(seg.text)"
                      :key="ti"
                      :class="`tok tok--${t.kind}`"
                      >{{ t.text }}</span
                    ></code
                  ><template v-else>{{ seg.text }}</template></template
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
  <p
    v-else
    class="api__missing"
  >
    No API data for "{{ name }}". Run <code>pnpm gen:api</code>.
  </p>
</template>

<style scoped>
/* github-light / github-dark colors, the same ones Shiki gives the site's code blocks. The dark
   ones hang on `:root[data-theme='dark']`, which Layout.vue sets from the VitePress toggle. */
.api {
  --api-tok-name: #0550ae;
  --api-tok-keyword: #cf222e;
  --api-tok-type: #953800;
  --api-tok-str: #0a3069;
  --api-tok-const: #0550ae;
  --api-tok-key: #0550ae;
  --api-tok-punct: #24292f;
}
:root[data-theme='dark'] .api {
  --api-tok-name: #79c0ff;
  --api-tok-keyword: #ff7b72;
  --api-tok-type: #ffa657;
  --api-tok-str: #a5d6ff;
  --api-tok-const: #79c0ff;
  --api-tok-key: #79c0ff;
  --api-tok-punct: #c9d1d9;
}
.tok--name {
  color: var(--api-tok-name);
}
.tok--keyword {
  color: var(--api-tok-keyword);
}
.tok--type {
  color: var(--api-tok-type);
}
.tok--str {
  color: var(--api-tok-str);
}
.tok--num,
.tok--const {
  color: var(--api-tok-const);
}
.tok--key,
/* Backtick code in descriptions holds prop identifiers (value, multiple, use-tags, v-model),
   so it gets the property color. Type columns never contain ident tokens. */
.tok--ident {
  color: var(--api-tok-key);
}
.tok--punct {
  color: var(--api-tok-punct);
}
/* Multi-line types after formatType: pre keeps an object member intact in a narrow column,
   inline-block gives the inline `code` background a single box for the whole block. */
.tok-pre {
  display: inline-block;
  max-width: 100%;
  overflow-x: auto;
  white-space: pre;
}

.api__req {
  color: var(--vp-c-danger-1, #e02424);
  margin-left: 2px;
}
.api__muted {
  color: var(--vp-c-text-2);
}
/* A wide type column scrolls inside the wrapper instead of stretching the page. The table stays
   display:table (VitePress markdown tables are block) so it spans the full width. */
.api__scroll {
  max-width: 100%;
  overflow-x: auto;
}
.api :deep(table) {
  display: table;
  width: 100%;
}
/* Only the header is filled; body rows skip the VitePress zebra
   (`.vp-doc tr:nth-child(2n)`, (0,2,1)). The selectors below are (0,2,2) and win. */
.api :deep(thead th) {
  background-color: var(--vp-c-bg-soft);
}
.api :deep(tbody tr) {
  background-color: transparent;
}
.api__missing {
  color: var(--vp-c-text-2);
}
</style>
