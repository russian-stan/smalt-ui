/**
 * Tokenizer for type and value strings in the API tables (`ApiTable.vue`). The grammar is closed
 * (unions, object literals, literals, PascalCase names, event tuples), so a character scanner is
 * enough without Shiki. Lossless: joining the `text` of all tokens gives back the source string.
 */

export type TokenKind =
  | 'str' // quoted string literal: "md", "#3B82F6"
  | 'num' // numeric literal: 0, 24
  | 'const' // true | false | null | undefined
  | 'keyword' // primitives: string | number | boolean | …
  | 'type' // PascalCase type name: CalendarDate, STreeItem
  | 'key' // object key / parameter name before ':'
  | 'punct' // | { } [ ] ( ) ; : ? , . =>
  | 'ident' // any other identifier (fallback; absent from current data)
  | 'ws' // whitespace (not colored)

export interface Token {
  text: string
  kind: TokenKind
}

const KEYWORDS = new Set([
  'string',
  'number',
  'boolean',
  'object',
  'symbol',
  'bigint',
  'any',
  'unknown',
  'never',
  'void',
])
const CONSTS = new Set(['true', 'false', 'null', 'undefined'])
const PUNCT = new Set(['|', '{', '}', '[', ']', '(', ')', ';', ':', '?', ',', '.'])

/**
 * Type tree for `formatType`: objects expand with indentation, long unions go into a column with a
 * leading `|`, as Prettier does. Only spaces, line breaks and `|` are added, so `tokenize` parses
 * the result just the same.
 */
type TypeNode =
  | { k: 'atom'; text: string }
  | { k: 'array'; of: TypeNode }
  | { k: 'paren'; inner: TypeNode }
  | { k: 'union'; parts: TypeNode[] }
  | { k: 'object'; members: { key: string; opt: boolean; type: TypeNode }[] }
  | { k: 'tuple'; elems: { name: string; type: TypeNode }[] }

// A union longer than this (flattened) is printed as a column.
const UNION_MAX = 28
const INDENT = '  '
const pad = (d: number) => INDENT.repeat(d)
const isWordChar = (c: string | undefined) => c !== undefined && /[A-Za-z0-9_$.]/.test(c)

function parseTypeTree(s: string): TypeNode {
  let i = 0
  const n = s.length
  const ws = () => {
    while (i < n && s[i] === ' ') i++
  }
  const word = () => {
    const start = i
    while (isWordChar(s[i])) i++
    return s.slice(start, i)
  }

  function parseUnion(): TypeNode {
    const parts = [parsePostfix()]
    for (;;) {
      ws()
      if (s[i] === '|') {
        i++
        parts.push(parsePostfix())
      } else break
    }
    return parts.length === 1 ? parts[0] : { k: 'union', parts }
  }
  function parsePostfix(): TypeNode {
    let node = parsePrimary()
    for (;;) {
      ws()
      if (s[i] === '[' && s[i + 1] === ']') {
        i += 2
        node = { k: 'array', of: node }
      } else break
    }
    return node
  }
  function parsePrimary(): TypeNode {
    ws()
    const c = s[i]
    if (c === '{') return parseObject()
    if (c === '[') return parseTuple()
    if (c === '(') {
      let depth = 0
      let j = i
      for (; j < n; j++) {
        const ch = s[j]
        if (ch === '"') {
          j++
          while (j < n && s[j] !== '"') j++
        } else if (ch === '(') depth++
        else if (ch === ')' && --depth === 0) break
      }
      const raw = s.slice(i, j + 1)
      // A function type `(a: T) => R` stays on one line.
      if (raw.includes('=>')) {
        i = j + 1
        return { k: 'atom', text: raw }
      }
      i++
      const inner = parseUnion()
      ws()
      if (s[i] === ')') i++
      return { k: 'paren', inner }
    }
    if (c === '"') {
      const start = i
      i++
      while (i < n && s[i] !== '"') i++
      if (s[i] === '"') i++
      return { k: 'atom', text: s.slice(start, i) }
    }
    return { k: 'atom', text: word() || s[i++] || '' }
  }
  function parseObject(): TypeNode {
    i++ // '{'
    const members: { key: string; opt: boolean; type: TypeNode }[] = []
    ws()
    if (s[i] === '}') {
      i++
      return { k: 'object', members }
    }
    for (;;) {
      ws()
      const key = word()
      ws()
      const opt = s[i] === '?'
      if (opt) i++
      ws()
      if (s[i] === ':') i++
      members.push({ key, opt, type: parseUnion() })
      ws()
      if (s[i] === ';') {
        i++
        ws()
        if (s[i] === '}') {
          i++
          break
        }
        continue
      }
      if (s[i] === '}') i++
      break
    }
    return { k: 'object', members }
  }
  function parseTuple(): TypeNode {
    i++ // '['
    const elems: { name: string; type: TypeNode }[] = []
    ws()
    if (s[i] === ']') {
      i++
      return { k: 'tuple', elems }
    }
    for (;;) {
      ws()
      const name = word()
      ws()
      if (s[i] === ':') i++
      elems.push({ name, type: parseUnion() })
      ws()
      if (s[i] === ',') {
        i++
        continue
      }
      if (s[i] === ']') i++
      break
    }
    return { k: 'tuple', elems }
  }

  return parseUnion()
}

function flatType(node: TypeNode): string {
  switch (node.k) {
    case 'atom':
      return node.text
    case 'array':
      return flatType(node.of) + '[]'
    case 'paren':
      return '(' + flatType(node.inner) + ')'
    case 'union':
      return node.parts.map(flatType).join(' | ')
    case 'object':
      return node.members.length
        ? '{ ' +
            node.members
              .map((m) => m.key + (m.opt ? '?' : '') + ': ' + flatType(m.type))
              .join('; ') +
            ' }'
        : '{}'
    case 'tuple':
      return '[' + node.elems.map((e) => e.name + ': ' + flatType(e.type)).join(', ') + ']'
  }
}

function containsObject(node: TypeNode): boolean {
  switch (node.k) {
    case 'object':
      return true
    case 'array':
      return containsObject(node.of)
    case 'paren':
      return containsObject(node.inner)
    case 'union':
      return node.parts.some(containsObject)
    default:
      return false
  }
}

/**
 * Multi-line printing. `d` is the indent level of the line where the node starts (its label or
 * opening bracket); line breaks and the closing bracket are printed relative to `d`.
 * Objects always expand; a union expands only when it is long or contains an object.
 * Grouping parentheses `( … )` stay inline (expanding them would only confuse).
 */
function printType(node: TypeNode, d: number): string {
  switch (node.k) {
    case 'atom':
      return node.text
    case 'array':
      return printType(node.of, d) + '[]'
    case 'paren':
      return '(' + flatType(node.inner) + ')'
    case 'union': {
      const broken = flatType(node).length > UNION_MAX || node.parts.some(containsObject)
      if (!broken) return flatType(node)
      // Leading `|`: each member on its own line, one level deeper than the label.
      return node.parts.map((p) => '\n' + pad(d + 1) + '| ' + printType(p, d + 1)).join('')
    }
    case 'object': {
      if (!node.members.length) return '{}'
      const body = node.members
        .map((m, idx) => {
          const printed = printType(m.type, d + 1)
          const sep = printed.startsWith('\n') ? '' : ' '
          const semi = idx === node.members.length - 1 ? '' : ';'
          return pad(d + 1) + m.key + (m.opt ? '?' : '') + ':' + sep + printed + semi
        })
        .join('\n')
      return '{\n' + body + '\n' + pad(d) + '}'
    }
    case 'tuple': {
      if (!node.elems.length) return '[]'
      const parts = node.elems.map((e) => {
        const printed = printType(e.type, d)
        return {
          text: e.name + ':' + (printed.startsWith('\n') ? '' : ' ') + printed,
          multi: printed.includes('\n'),
        }
      })
      if (!parts.some((p) => p.multi)) return '[' + parts.map((p) => p.text).join(', ') + ']'
      const body = parts.map((p) => pad(d + 1) + p.text).join(',\n')
      return '[\n' + body + '\n' + pad(d) + ']'
    }
  }
}

export function formatType(src: string): string {
  // An expanded top-level union starts with '\n', so the empty first line is dropped.
  return printType(parseTypeTree(src), 0).replace(/^\n/, '')
}

/**
 * `vue-component-meta` describes an event as a parameter tuple (`[value: boolean]`, or `[]` without
 * arguments), and in a table a tuple reads as an array. So the handler type is printed instead:
 * bare empty brackets would look like missing data. The brackets are swapped on the printed string,
 * because the parser handles a tuple but not a parenthesized parameter list.
 */
export function formatEventSignature(src: string): string {
  const printed = formatType(src)
  if (!printed.startsWith('[') || !printed.endsWith(']')) return printed
  return `(${printed.slice(1, -1)}) => void`
}

const isIdentStart = (c: string) => /[A-Za-z_$]/.test(c)
const isIdentPart = (c: string) => /[A-Za-z0-9_$]/.test(c)
const isDigit = (c: string) => c >= '0' && c <= '9'
const isSpace = (c: string) => c === ' ' || c === '\t' || c === '\n'

export function tokenize(src: string): Token[] {
  const tokens: Token[] = []
  const n = src.length
  let i = 0

  while (i < n) {
    const c = src[i]

    if (isSpace(c)) {
      let j = i + 1
      while (j < n && isSpace(src[j])) j++
      tokens.push({ text: src.slice(i, j), kind: 'ws' })
      i = j
      continue
    }

    if (c === '"') {
      let j = i + 1
      while (j < n && src[j] !== '"') j++
      j = Math.min(j + 1, n)
      tokens.push({ text: src.slice(i, j), kind: 'str' })
      i = j
      continue
    }

    if (isDigit(c)) {
      let j = i + 1
      while (j < n && (isDigit(src[j]) || src[j] === '.')) j++
      tokens.push({ text: src.slice(i, j), kind: 'num' })
      i = j
      continue
    }

    if (c === '=' && src[i + 1] === '>') {
      tokens.push({ text: '=>', kind: 'punct' })
      i += 2
      continue
    }

    if (PUNCT.has(c)) {
      tokens.push({ text: c, kind: 'punct' })
      i += 1
      continue
    }

    if (isIdentStart(c)) {
      let j = i + 1
      while (j < n && isIdentPart(src[j])) j++
      const word = src.slice(i, j)
      let kind: TokenKind
      if (KEYWORDS.has(word)) {
        kind = 'keyword'
      } else if (CONSTS.has(word)) {
        kind = 'const'
      } else {
        // An object key or parameter name: followed by `:` after optional spaces and `?`.
        let k = j
        while (k < n && isSpace(src[k])) k++
        if (src[k] === '?') {
          k++
          while (k < n && isSpace(src[k])) k++
        }
        if (src[k] === ':') kind = 'key'
        else if (/[A-Z]/.test(word[0])) kind = 'type'
        else kind = 'ident'
      }
      tokens.push({ text: word, kind })
      i = j
      continue
    }

    // A single unrecognized character is kept (fallback; absent from current data).
    tokens.push({ text: c, kind: 'ident' })
    i += 1
  }

  return tokens
}

export interface DescSegment {
  text: string
  code: boolean
  /** Link (markdown `[text](url)`); the segment renders as `<a>`. */
  href?: string
}

/**
 * Splits a description into segments: paired backticks give `{ code: true }`, markdown links
 * `[text](url)` outside code give `{ href }`. Code segments are then tokenized as values.
 */
export function splitInlineCode(s: string): DescSegment[] {
  const out: DescSegment[] = []
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
  s.split('`').forEach((chunk, i) => {
    if (chunk === '') return
    if (i % 2 === 1) {
      out.push({ text: chunk, code: true })
      return
    }
    let last = 0
    let m: RegExpExecArray | null
    linkRe.lastIndex = 0
    while ((m = linkRe.exec(chunk)) !== null) {
      if (m.index > last) out.push({ text: chunk.slice(last, m.index), code: false })
      out.push({ text: m[1], code: false, href: m[2] })
      last = linkRe.lastIndex
    }
    if (last < chunk.length) out.push({ text: chunk.slice(last), code: false })
  })
  return out
}
