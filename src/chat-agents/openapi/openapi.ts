import { assert } from '../../lib/assert'
import { ChatAgent } from '../base'
import { logChatMessage } from '../logger'
import { ChatFunction, ChatMessage } from '../types'
import { fetchApi } from './client'
import { ChatCompletion, ChatCompletionChoice } from './types'

export interface OpenApiAgentOptions {
  model?: 'gpt-3.5-turbo-0613' | 'gpt-4-0613'
  temperature?: number
  apiKey?: string
  verbose?: boolean
}

export class OpenApiAgent extends ChatAgent {
  model: string
  temperature: number
  apiKey: string | undefined

  constructor({
    model = 'gpt-4-0613',
    temperature = 0,
    apiKey,
    verbose = false,
  }: OpenApiAgentOptions = {}) {
    super({ verbose })

    this.model = model
    this.temperature = temperature
    this.apiKey = apiKey
  }

  async call({
    messages,
    functions,
  }: {
    messages: ChatMessage[]
    functions?: ChatFunction[]
  }): Promise<ChatCompletionChoice> {
    this.onRequest(messages)

    const response = await fetchApi<ChatCompletion>(`/chat/completions`, {
      method: 'POST',
      body: {
        model: this.model,
        temperature: this.temperature,
        messages,
        functions,
      },
      apiKey: this.apiKey,
    })

    assert(response.choices.length === 1, 'Expected response.choices to be 1')

    const [choice] = response.choices

    this.onResponse(choice)

    return choice
  }

  protected onRequest(messages: ChatMessage[]) {
    this.logMessages(messages)
  }

  protected onResponse(choice: ChatCompletionChoice) {
    this.logMessages([choice.message])
  }

  protected logMessages(messages: ChatMessage[]) {
    if (!this.verbose) {
      return
    }

    // TODO incoming/outgoing

    messages.forEach(logChatMessage)
  }
}
