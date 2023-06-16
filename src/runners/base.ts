import { ChatAgent } from '../chat-agents/base'
import {
  ChatFunction,
  ChatMessage,
  ChatRequest,
  ChatResponse,
} from '../chat-agents/types'
import { RunnerHalt } from './types'

interface RunnerOptions {
  agent: ChatAgent
}

export abstract class Runner {
  agent: ChatAgent
  messages: ChatMessage[] = []
  functions: ChatFunction[] = []

  constructor({ agent }: RunnerOptions) {
    this.agent = agent
  }

  protected abstract call(args: ChatResponse): Promise<ChatMessage>

  private reset({ messages, functions }: ChatRequest) {
    this.messages = messages
    this.functions = functions ?? []
  }

  async run(request: ChatRequest) {
    this.reset(request)

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const assistantMessage = await this.agent.call({
        messages: this.messages,
        functions: this.functions,
      })

      try {
        const userMessage = await this.call(assistantMessage)
        this.messages = [...this.messages, assistantMessage, userMessage]
      } catch (error: any) {
        if (error instanceof RunnerHalt) {
          return error.result
        } else {
          throw error
        }
      }
    }
  }
}
