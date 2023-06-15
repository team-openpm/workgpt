import { ApiInterface, Invokable } from './types'
import { getInvocables } from './helpers/decorators'
import { getChatFunction } from './helpers/interface'
import { ChatFunction } from '../chat-agents/types'

export const invokableMetadataKey = Symbol('invokable')

export abstract class Api implements ApiInterface {
  get namespace() {
    return this.constructor.name
  }

  get functions(): ChatFunction[] {
    return this.invokables.map(getChatFunction)
  }

  get invokables(): Invokable[] {
    return getInvocables(this)
  }
}
