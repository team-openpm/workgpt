import { ChatAgent } from '../../chat-agents/base'
import { ChatMessage, UserChatMessage } from '../../chat-agents/types'
import { assert } from '../../lib/assert'
import { Runner } from '../base'
import { buildInitialPrompt } from './prompt'
import { parseInvocation } from './invocations/parse'
import { parseJsonFromMarkdown } from '../../lib/markdown'
import { Api } from '../../apis'
import { renderInvocationResult } from './invocations/render'

interface WorkGptRunnerOptions {
  agent: ChatAgent
  apis?: Api[]
  onResult?: (result?: string) => void
}

export class WorkGptRunner extends Runner {
  apis: Api[]

  constructor({ agent, onResult, apis = [] }: WorkGptRunnerOptions) {
    super({ agent, onResult })
    this.apis = apis
  }

  async runWithDirective(directive: string) {
    return this.run(buildInitialPrompt({ apis: this.apis, directive }))
  }

  async call(assistantMessages: ChatMessage[]): Promise<UserChatMessage[]> {
    assert(
      assistantMessages.length === 1,
      'WorkGptRunner only supports one assistant message'
    )

    return await this.onAssistantResponse(assistantMessages[0].content)
  }

  private async onAssistantResponse(
    response: string
  ): Promise<UserChatMessage[]> {
    const json = parseJsonFromMarkdown(response)

    const invocation = await parseInvocation(json, this.apis)
    const { api, method, args } = invocation

    const result = await api.invoke({ method, args })

    return [
      {
        role: 'user',
        content: renderInvocationResult({ invocation, result }),
      },
    ]
  }
}
