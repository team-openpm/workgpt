import { z } from 'zod'
import { ChatFunction } from '../chat-agents/types'

export interface ApiInterface {
  namespace: string
  functions: ChatFunction[]
  invoke: (args: {
    functionName: string
    functionArgs: Record<string, any>
  }) => Promise<string>
}

export interface Invokable {
  description: string
  name: string
  schema?: z.ZodObject<any, any>
}
