import { ApiInterface } from '../../apis/types'
import { ChatMessage, ChatRequest } from '../../chat-agents/types'

export function buildInitialPrompt({
  apis,
  directive,
}: {
  apis: ApiInterface[]
  directive: string
}): ChatRequest {
  const messages: ChatMessage[] = [
    {
      content: `You are WorkGpt, a helpful assistant that performs tasks.`,
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
