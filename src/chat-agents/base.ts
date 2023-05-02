import { ChatMessage } from './types'

export abstract class ChatAgent {
  verbose: boolean

  constructor({ verbose = false }: { verbose?: boolean } = {}) {
    this.verbose = verbose
  }

  abstract call(messages: ChatMessage[]): Promise<ChatMessage[]>
}
