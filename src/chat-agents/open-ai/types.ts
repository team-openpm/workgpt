type ChatRole = 'user' | 'system' | 'assistant'

type JsonString = string

export interface OpenAIChatCompletionMessage {
  role: ChatRole
  content: string
  function_call?: {
    name: string
    arguments: JsonString
  }
}

export interface OpenAIChatCompletionChoice {
  message: OpenAIChatCompletionMessage
  finish_reason: string
  index: number
}

export interface OpenAIChatCompletion {
  id: string
  object: string
  created: number
  model: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  choices: OpenAIChatCompletionChoice[]
}
