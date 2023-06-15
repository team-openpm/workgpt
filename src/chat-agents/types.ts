import { JSONSchema7 } from 'json-schema'

export type ChatMessageRole = 'user' | 'system' | 'assistant' | 'function'

export interface ChatMessage {
  role: ChatMessageRole
  content: string
  name?: string
  functionCall?: ChatFunctionCall
}

export interface ChatFunctionCall {
  name: string
  arguments: any
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

export type ChatResponse = ChatMessage
