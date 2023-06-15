import { z } from 'zod'
import { ChatFunction } from '../chat-agents/types'

export interface ApiInterface {
  namespace: string
  functions: ChatFunction[]
  invokables: Invokable[]
}

export interface Invokable {
  usage: string
  name: string
  schema?: z.AnyZodObject
  callback: (args: Record<string, any>) => Promise<any>
}
