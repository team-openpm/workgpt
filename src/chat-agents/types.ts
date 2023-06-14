import { JSONSchema7 } from 'json-schema'

export type ChatMessageRole = 'user' | 'system' | 'assistant' | 'function'

export interface ChatMessage {
  role: ChatMessageRole
  content: string
  name?: string
}

export interface UserChatMessage extends ChatMessage {
  role: 'user'
}

export interface ChatFunction {
  name: string
  description: string
  parameters: JSONSchema7
}

export interface ChatRequest {
  messages: ChatMessage[]
  functions?: ChatFunction[]
  functionCall?: string
}

export interface ChatResponseMessage {
  role: ChatMessageRole
  content: string
}

export interface ChatResponseFunctionCall {
  name: string
  arguments: any
}

export interface ChatResponse {
  message: ChatResponseMessage
  functionCall?: ChatResponseFunctionCall
}
