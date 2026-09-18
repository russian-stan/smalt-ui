/**
 * The mode follows the consumer's `process.env.NODE_ENV`: `import.meta.env.DEV` is frozen to
 * `false` when the library itself is built. Without `process` (a browser with no bundler) the mode
 * counts as dev. Node types are not pulled into the build, so `process` is declared by hand; the
 * `process.env.NODE_ENV` literal stays verbatim, otherwise the app bundler would not replace it.
 */
declare const process: { env?: Record<string, string | undefined> } | undefined

export function isDevMode(): boolean {
  return typeof process === 'undefined' || process.env?.NODE_ENV !== 'production'
}

// Deduplication: warnings are called from computed and watchEffect on every re-run.
const warned = new Set<string>()

export function devWarn(message: string): void {
  if (!isDevMode() || warned.has(message)) return
  warned.add(message)
  console.warn(message)
}

/** Resets the warning history, for tests that check whether a warning was printed. */
export function resetDevWarnings(): void {
  warned.clear()
}
