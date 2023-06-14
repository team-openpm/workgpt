type ChatRole = 'user' | 'system' | 'assistant'

export interface ChatCompletionChoice {
  message: {
    role: ChatRole
    content: string
  }
  finish_reason: string
  index: number
  function_call?: {
    name: string
    arguments: Record<string, any>
  }
}

export interface ChatCompletion {
  id: string
  object: string
  created: number
  model: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  choices: ChatCompletionChoice[]
}
