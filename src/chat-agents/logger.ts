import chalk, { ColorName } from 'chalk'
import { ChatFunction, ChatMessage } from './types'

export function logChatFunction(
  direction: 'incoming' | 'outgoing',
  chatFunction: ChatFunction
) {
  const message = prefixLines(
    `${direction === 'outgoing' ? '>>>' : '<<<'} functions: `.padEnd(20),
    JSON.stringify(chatFunction, null, 2)
  )
  console.log(chalk.white(message))
}

export function logChatMessage(
  direction: 'incoming' | 'outgoing',
  message: ChatMessage
): void {
  const color = getColor(message.role)
  const log = prefixLines(
    `${direction === 'outgoing' ? '>>>' : '<<<'} ${message.role}: `.padEnd(20),
    JSON.stringify(message, null, 2)
  )

  console.log(chalk[color](log))
}

function getColor(role: string): ColorName {
  switch (role) {
    case 'function':
      return 'green'
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
