import { ChatAgent } from '../../chat-agents/base'
import { ChatMessage } from '../../chat-agents/types'
import { assert } from '../../lib/assert'
import { Runner } from '../base'
import { buildInitialPrompt } from './prompt'
import { WorkGptControl } from '../../apis/workgpt-control'
import { Api } from '../../apis'
import { execInvocations } from './parser'
import { parseJavaScriptFromMarkdown } from '../../lib/markdown'

interface WorkGptScriptRunnerOptions {
  agent: ChatAgent
  apis?: Api[]
  onResult?: (result?: string) => void
}

// Experimental script runner that allows the assistant to run JavaScript
export class WorkGptScriptRunner extends Runner {
  apis: Api[]

  constructor({ agent, onResult, apis = [] }: WorkGptScriptRunnerOptions) {
    super({ agent, onResult })
    this.apis = [...apis, new WorkGptControl()]
  }

  async runWithDirective(directive: string) {
    return this.run(buildInitialPrompt({ apis: this.apis, directive }))
  }

  async call(assistantMessages: ChatMessage[]) {
    assert(
      assistantMessages.length === 1,
      'WorkGptRunner only supports one assistant message'
    )
    this.onAssistantResponse(assistantMessages[0].content)
    return []
  }

  private async onAssistantResponse(response: string) {
    const script = parseJavaScriptFromMarkdown(response)
    await execInvocations(script, this.apis)
  }
}
