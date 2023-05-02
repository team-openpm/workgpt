import { indent } from '../../lib/string-fns'

export function buildInterface(namespace: string, definition: string): string {
  return `declare namespace ${namespace} {\n${indent(definition)}\n}`
}
