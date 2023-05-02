import { Api } from '../../../apis'

export interface Invocation {
  api: Api
  method: string
  args: any[]
}

export interface InvocationResult {
  invocation: Invocation
  result: string
}
