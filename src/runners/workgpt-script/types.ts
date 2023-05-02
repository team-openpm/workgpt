import { Api } from '../../apis'

export const GLOBAL_NAMESPACE = 'WorkGpt'

export interface Invocation {
  api: Api
  method: string
  args: any[]
}

export interface InvocationResult {
  invocation: Invocation
  result: string
}
