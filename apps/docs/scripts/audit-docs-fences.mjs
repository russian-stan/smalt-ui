#!/usr/bin/env node
/**
 * Catches a compact S-tag closing in docs code fences: text and `</S…` on the line with `>`.
 * Prettier with `singleAttributePerLine: true` considers this form stable and does not fix it.
 * Run from the repo root: pnpm --filter docs audit:demos
 */

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { relative, resolve, sep } from 'node:path'

const ROOTS = ['.']
const EXTENSIONS = ['.md', '.vue']

/**
 * Compact form signature: `  >Get started</SButton`, a line that starts with `>` and ends with
 * `</S…` without the closing `>` (it is on the next line, otherwise the markup would be invalid).
 */
const COMPACT_RE = /^\s*>.*<\/(S[A-Za-z]+)\s*$/

const isSkipped = (path) =>
  path.split(sep).includes('node_modules') || /\.vitepress[/\\](?:cache|dist)[/\\]/.test(path)

function collect(target, acc) {
  if (isSkipped(target)) return acc
  let stat
  try {
    stat = statSync(target)
  } catch {
    return acc
  }
  if (stat.isFile()) {
    if (EXTENSIONS.some((ext) => target.endsWith(ext))) acc.push(target)
    return acc
  }
  if (!stat.isDirectory()) return acc
  for (const entry of readdirSync(target)) collect(resolve(target, entry), acc)
  return acc
}

// Roots resolve from the script location, so pnpm --filter and plain node behave the same.
const docsRoot = resolve(import.meta.dirname, '..')
const cwd = process.cwd()
const findings = []
let scanned = 0
for (const root of ROOTS) {
  for (const file of collect(resolve(docsRoot, root), [])) {
    scanned++
    const lines = readFileSync(file, 'utf8').split('\n')
    for (let i = 0; i < lines.length; i++) {
      const compact = lines[i].match(COMPACT_RE)
      if (compact) {
        findings.push(
          `  ${relative(cwd, file)}:${i + 1}  compact form ">…</${compact[1]}": the closing ">" is on the next line`,
        )
      }
    }
  }
}

if (!findings.length) {
  console.log(`Fences are clean: ${scanned} files scanned, no findings.`)
  process.exit(0)
}

console.log(
  `Findings: ${findings.length}. Bring the closing tag to the canonical form: ">" and "</S…>" on ` +
    'their own lines, with the text indented between them.',
)
console.log(findings.join('\n'))
process.exit(1)
