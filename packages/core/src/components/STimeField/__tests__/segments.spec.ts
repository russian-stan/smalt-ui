/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { STimeField } from '../index'
import { SDateField } from '../../SDateField'

/**
 * The trailing separator before the time zone name comes from ICU, and its text differs between
 * Node and the browser, so in server markup it breaks hydration. `de-DE` is used because it has
 * a locale-specific literal after the hour (" Uhr"). This file checks the server side; the client
 * side lives in `segments.spec.browser.ts`, and both must agree on the same set of segments.
 */
function segmentsOf(html: string, block: string): string[] {
  return [...html.matchAll(new RegExp(`data-reka-${block}-segment="([^"]+)"`, 'g'))].map(
    (m) => m[1],
  )
}

describe('time field segments · SSR', () => {
  it('hour granularity leaves no dangling literal', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () => h(STimeField, { label: 'Time', granularity: 'hour', locale: 'de-DE' }),
      }),
    )
    expect(segmentsOf(html, 'time-field')).toEqual(['hour'])
  })

  it('minute granularity keeps the separator between hours and minutes', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () => h(STimeField, { label: 'Time', locale: 'de-DE' }),
      }),
    )
    expect(segmentsOf(html, 'time-field')).toEqual(['hour', 'literal', 'minute'])
  })

  it('the separator before AM/PM is a regular space, not the narrow no-break space from ICU', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () => h(STimeField, { label: 'Time', granularity: 'hour', locale: 'en-US' }),
      }),
    )
    const literal = html.match(
      /data-reka-time-field-segment="literal"[^>]*>(?:<!--\[-->)?([^<]*)/,
    )![1]
    expect([...literal].map((c) => c.codePointAt(0))).toEqual([0x20])
  })

  it('a date field with time leaves no dangling literal', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () => h(SDateField, { label: 'Date', granularity: 'minute', locale: 'de-DE' }),
      }),
    )
    expect(segmentsOf(html, 'date-field').at(-1)).not.toBe('literal')
  })
})
