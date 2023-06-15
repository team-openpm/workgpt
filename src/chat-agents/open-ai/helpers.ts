import { ChatFunctionCall, ChatMessage } from '../types'
import { OpenAIChatCompletionMessage } from './types'

export function normalizeChatMessage(
  message: OpenAIChatCompletionMessage
): ChatMessage {
  let functionCall: ChatFunctionCall | undefined

  if (message.function_call) {
    functionCall = {
      name: message.function_call.name,
      arguments: JSON.parse(message.function_call.arguments),
    }
  }

  return {
    role: message.role,
    content: message.content,
    functionCall,
  }
}
