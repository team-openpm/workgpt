import { ChatFunction, ChatMessage, ChatResponse } from './types'

export abstract class ChatAgent {
  verbose: boolean

  constructor({ verbose = false }: { verbose?: boolean } = {}) {
    this.verbose = verbose
  }

  abstract call(args: {
    messages: ChatMessage[]
    functions?: ChatFunction[]
  }): Promise<ChatResponse>
}
