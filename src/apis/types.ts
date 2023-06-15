import { z } from 'zod'
import { ChatFunction } from '../chat-agents/types'

export interface ApiInterface {
  namespace: string
  functions: ChatFunction[]
  invokables: Invokable[]
}

export interface Invokable {
  description: string
  name: string
  schema?: z.ZodObject<any, any>
  callback: (args: Record<string, any>) => Promise<any>
}
