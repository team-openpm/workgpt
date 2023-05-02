import { ChatAgent } from '../base'
import { logChatMessage } from '../logger'
import { ChatMessage } from '../types'
import { fetchApi } from './client'
import { ChatCompletion } from './types'

export interface OpenApiAgentOptions {
  model?: 'gpt-3.5-turbo' | 'gpt-4'
  temperature?: number
  apiKey?: string
  verbose?: boolean
}

export class OpenApiAgent extends ChatAgent {
  model: string
  temperature: number
  apiKey: string | undefined

  constructor({
    model = 'gpt-3.5-turbo',
    temperature = 0,
    apiKey,
    verbose = false,
  }: OpenApiAgentOptions = {}) {
    super({ verbose })

    this.model = model
    this.temperature = temperature
    this.apiKey = apiKey
  }

  async call(messages: ChatMessage[]): Promise<ChatMessage[]> {
    this.onRequest(messages)

    const response = await fetchApi<ChatCompletion>(`/chat/completions`, {
      method: 'POST',
      body: {
        model: this.model,
        temperature: this.temperature,
        messages,
      },
      apiKey: this.apiKey,
    })

    const responseMessages: ChatMessage[] = response.choices.map(
      (choice) => choice.message
    )

    this.onResponse(responseMessages)

    return responseMessages
  }

  protected onRequest(messages: ChatMessage[]) {
    this.logMessages(messages)
  }

  protected onResponse(messages: ChatMessage[]) {
    this.logMessages(messages)
  }

  protected logMessages(messages: ChatMessage[]) {
    if (!this.verbose) {
      return
    }

    // TODO incoming/outgoing

    messages.forEach(logChatMessage)
  }
}
