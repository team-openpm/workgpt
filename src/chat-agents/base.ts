import { ChatRequest, ChatResponse } from './types'

export abstract class ChatAgent {
  verbose: boolean

  constructor({ verbose = false }: { verbose?: boolean } = {}) {
    this.verbose = verbose
  }

  abstract call(args: ChatRequest): Promise<ChatResponse>
}
