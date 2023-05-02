export function indent(str: string, level = 2) {
  return str
    .split('\n')
    .map((line) => `${' '.repeat(level)}${line}`)
    .join('\n')
}

export function wrapInComment(usage: string): string {
  return usage
    .split('\n')
    .map((line) => `// ${line}`)
    .join('\n')
}
