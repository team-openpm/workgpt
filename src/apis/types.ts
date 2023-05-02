import { z } from 'zod'

export interface ApiInterface {
  namespace: string
  interface: string
  invoke: (args: { method: string; args: any }) => Promise<string>
}

export interface Invokable {
  usage: string
  method: string
  schema: z.ZodType<any> | null
  responseSchema: z.ZodType<any> | null
}
