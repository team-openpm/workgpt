import { z } from 'zod'
import { ChatRequest } from '../chat-agents/types'
import { Api } from './base'
import { invokable } from './helpers/decorators'
import {
  OpenAiAgent,
  OpenApiAgentOptions,
} from '../chat-agents/open-ai/open-ai'

export class FactApi extends Api {
  chatClient: OpenAiAgent

  constructor(options: OpenApiAgentOptions = {}) {
    super()
    this.chatClient = new OpenAiAgent(options)
  }

  @invokable({
    usage: `Useful for asking questions like "What is the capital of France?"`,
    schema: z.object({
      question: z.string(),
    }),
  })
  async askQuestion({ question }: { question: string }): Promise<string> {
    const response = await this.chatClient.call(
      this.buildQuestionPrompt(question)
    )

    return response.content!
  }

  private buildQuestionPrompt(question: string): ChatRequest {
    return {
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that answers questions with facts. Do not guess. If you do not know the answer, say "I don't know."`,
        },
        {
          role: 'user',
          content: question,
        },
      ],
    }
  }
}
