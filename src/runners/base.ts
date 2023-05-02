import { ChatAgent } from '../chat-agents/base'
import { ChatMessage, UserChatMessage } from '../chat-agents/types'
import { ManagedError, RunnerHalt } from './types'

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

  protected abstract call(messages: ChatMessage[]): Promise<UserChatMessage[]>

  async run(messages: ChatMessage[] = []) {
    const assistantMessages = await this.agent.call(messages)

    let userMessages: ChatMessage[] = []

    try {
      userMessages = await this.call(assistantMessages)
    } catch (error: any) {
      if (error instanceof RunnerHalt) {
        this.onHalt(error.result)
        return
      } else if (error instanceof ManagedError) {
        userMessages = [
          {
            role: 'user',
            content: `Error: ${error?.message}`,
          },
        ]
      } else {
        throw error
      }
    }

    await this.run([...messages, ...assistantMessages, ...userMessages])
  }

  onHalt(result: string) {
    if (this.onResult) {
      this.onResult(result)
    } else {
      console.log(`Result for ${this.constructor.name}: ${result}`)
    }
  }
}
