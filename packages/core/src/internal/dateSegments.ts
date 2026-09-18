/**
 * Date/time segment separators come from ICU, and server and browser ICU versions differ, so
 * hydration mismatches for no real reason. Hence two adjustments: a trailing separator is not
 * rendered (Reka asks `Intl` for the time zone name and, for a value without a zone, drops the
 * segment itself but keeps the separator), and spaces inside are normalized to a regular space.
 */
export interface DateSegment {
  part: string
  value: string
}

// No-break, thin and narrow no-break spaces: the ones ICU versions disagree on.
const SPACES = /[\u00a0\u2009\u202f]/g

export function visibleSegments<T extends DateSegment>(segments: readonly T[]): T[] {
  let end = segments.length
  while (end > 0 && segments[end - 1].part === 'literal') end--
  return segments
    .slice(0, end)
    .map((segment) =>
      segment.part === 'literal'
        ? { ...segment, value: segment.value.replace(SPACES, ' ') }
        : segment,
    )
}
