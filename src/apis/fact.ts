import { z } from 'zod'
import {
  OpenApiAgent,
  OpenApiAgentOptions,
} from '../chat-agents/openapi/openapi'
import { ChatMessage } from '../chat-agents/types'
import { first } from '../lib/array-fns'
import { assertString } from '../lib/assert'
import { Api } from './base'
import { invokable } from './helpers/decorators'

export class FactApi extends Api {
  chatClient: OpenApiAgent

  constructor(options: OpenApiAgentOptions = {}) {
    super()
    this.chatClient = new OpenApiAgent(options)
  }

  @invokable({
    usage: `Useful for asking questions like "What is the capital of France?"`,
    schema: z.tuple([z.string()]),
    responseSchema: z.string(),
  })
  async askQuestion(question: string): Promise<string> {
    const responses = await this.chatClient.call(
      this.buildQuestionPrompt(question)
    )

    const firstResponse = first(responses)

    assertString(
      firstResponse?.content,
      'Expected a response from the chat agent.'
    )

    return firstResponse.content
  }

  private buildQuestionPrompt(question: string): ChatMessage[] {
    return [
      {
        role: 'system',
        content: `You are a helpful assistant that answers questions with facts. Do not guess. If you do not know the answer, say "I don't know."`,
      },
      {
        role: 'user',
        content: question,
      },
    ]
  }
}
