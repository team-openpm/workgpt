import chalk, { ColorName } from 'chalk'
import { ChatMessage } from './types'

export function logChatMessage({ content, role }: ChatMessage): void {
  const color = getColor(role)
  const message = prefixLines(`${role}: `.padEnd(20), content)

  console.log(chalk[color](message))
}

function getColor(role: string): ColorName {
  switch (role) {
    case 'assistant':
      return 'blue'
    case 'user':
      return 'red'
    default:
      return 'white'
  }
}

function prefixLines(prefix: string, text: string): string {
  return text
    .split('\n')
    .map((line) => `${prefix}${line}`)
    .join('\n')
}
