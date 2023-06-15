import { JSONSchema7 } from 'json-schema'

export type ChatMessageRole = 'user' | 'system' | 'assistant' | 'function'

export interface ChatFunctionCall {
  name: string
  arguments: string
}

export interface ChatFunction {
  name: string
  description: string
  parameters: JSONSchema7
}

export interface ChatMessage {
  role: ChatMessageRole
  content?: string
  name?: string
  function_call?: ChatFunctionCall
}

export interface ChatRequest {
  messages: ChatMessage[]
  functions?: ChatFunction[]
  functionCall?: string
}

export type ChatResponse = ChatMessage
