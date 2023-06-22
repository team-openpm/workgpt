import { ApiInterface } from '../../apis/types'
import { ChatMessage, ChatRequest } from '../../chat-agents/types'

export function buildInitialPrompt({
  apis,
  directive,
  systemMessage,
}: {
  apis: ApiInterface[]
  directive: string
  systemMessage?: string
}): ChatRequest {
  const messages: ChatMessage[] = [
    {
      content: systemMessage ?? `You are WorkGpt, a helpful assistant that performs tasks.`,
      role: 'system',
    },
    {
      content: directive,
      role: 'user',
    },
  ]

  const functions = apis.flatMap((api) => api.functions)

  return {
    messages,
    functions,
  }
}
