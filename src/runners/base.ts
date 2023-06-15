import { ChatAgent } from '../chat-agents/base'
import { ChatMessage, ChatRequest, ChatResponse } from '../chat-agents/types'
import { RunnerHalt } from './types'

interface RunnerOptions {
  agent: ChatAgent
  onResult?: (result?: string) => void
}

export abstract class Runner {
  agent: ChatAgent
  onResult?: (result?: string) => void

  constructor({ agent, onResult }: RunnerOptions) {
    this.agent = agent
    this.onResult = onResult
  }

  protected abstract call(args: ChatResponse): Promise<ChatMessage>

  async run(request: ChatRequest) {
    const assistantMessage = await this.agent.call(request)

    let userMessage: ChatMessage

    try {
      userMessage = await this.call(assistantMessage)
    } catch (error: any) {
      if (error instanceof RunnerHalt) {
        this.onHalt(error.result)
        return
      } else {
        throw error
      }
    }

    await this.run({
      messages: [...request.messages, assistantMessage, userMessage],
      functions: request.functions,
    })
  }

  onHalt(result?: any) {
    if (this.onResult) {
      this.onResult(result)
    } else {
      console.log(`Result for ${this.constructor.name}: ${result}`)
    }
  }
}
