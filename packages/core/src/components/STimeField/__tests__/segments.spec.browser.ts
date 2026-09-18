import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/vue'
import { STimeField } from '../index'

/**
 * Client half of the check in `segments.spec.ts`: the set of segments in the browser must match
 * the server one. The weak spot is the separator before the time zone name: its ICU text differs
 * between Node and the browser, and hydration breaks on it.
 */
function segmentsOf(root: Element): string[] {
  return [...root.querySelectorAll('[data-reka-time-field-segment]')].map((el) =>
    el.getAttribute('data-reka-time-field-segment')!,
  )
}

describe('time field segments · browser', () => {
  it('hour granularity leaves no dangling literal', () => {
    const { container } = render(STimeField, {
      props: { label: 'Time', granularity: 'hour', locale: 'de-DE' },
    })
    expect(segmentsOf(container)).toEqual(['hour'])
  })

  it('minute granularity keeps the separator between hours and minutes', () => {
    const { container } = render(STimeField, { props: { label: 'Time', locale: 'de-DE' } })
    expect(segmentsOf(container)).toEqual(['hour', 'literal', 'minute'])
  })

  it('in en-US hour granularity ends with a segment and the separator is a regular space', () => {
    const { container } = render(STimeField, {
      props: { label: 'Time', granularity: 'hour', locale: 'en-US' },
    })
    expect(segmentsOf(container).at(-1)).toBe('dayPeriod')
    const literal = container.querySelector('[data-reka-time-field-segment="literal"]')!
    expect([...literal.textContent!].map((c) => c.codePointAt(0))).toEqual([0x20])
  })
})
