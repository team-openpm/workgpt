import { JSONSchema7 } from 'json-schema'

export type ChatMessageRole = 'user' | 'system' | 'assistant'

export interface ChatMessage {
  role: ChatMessageRole
  content: string
}

export interface UserChatMessage extends ChatMessage {
  role: 'user'
}

export interface ChatFunction {
  name: string
  description: string
  parameters: JSONSchema7
}

export interface ChatResponse {
  message: {
    role: ChatMessageRole
    content: string
  }
  function_call?: {
    name: string
    arguments: Record<string, any>
  }
}
