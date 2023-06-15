import { ChatAgent } from '../../chat-agents/base'
import {
  ChatFunctionCall,
  ChatMessage,
  ChatResponse,
} from '../../chat-agents/types'
import { Runner } from '../base'
import { buildInitialPrompt } from './prompt'
import { Api } from '../../apis'
import { WorkGptControl } from '../../apis/workgpt-control'
import { haltProgram } from '../control'

interface WorkGptRunnerOptions {
  agent: ChatAgent
  apis?: Api[]
  onResult?: (result?: string) => void
}

export class WorkGptRunner extends Runner {
  apis: Api[]

  constructor({ agent, onResult, apis = [] }: WorkGptRunnerOptions) {
    super({ agent, onResult })
    this.apis = [...apis, new WorkGptControl()]
  }

  async runWithDirective(directive: string) {
    return this.run(buildInitialPrompt({ apis: this.apis, directive }))
  }

  async call(message: ChatResponse): Promise<ChatMessage> {
    if (message.function_call) {
      return this.onFunctionCall(message.function_call)
    }

    haltProgram(message)
  }

  private async onFunctionCall(
    functionCall: ChatFunctionCall
  ): Promise<ChatMessage> {
    const func = this.invokables.find((inv) => inv.name === functionCall.name)

    if (!func) {
      throw new Error(`Unknown function: ${functionCall.name}`)
    }

    const parsedArguments = JSON.parse(functionCall.arguments)

    const result = await func.callback(parsedArguments)
    const content = typeof result === 'string' ? result : JSON.stringify(result)

    return {
      role: 'function',
      name: functionCall.name,
      content,
    }
  }

  private get invokables() {
    return this.apis.flatMap((api) => api.invokables)
  }
}
