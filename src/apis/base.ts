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

  async invoke({
    functionName,
    functionArgs,
  }: {
    functionName: string
    functionArgs: Record<string, any>
  }): Promise<string> {
    const invokable = this.invokables.find((i) => i.name === functionName)

    if (!invokable) {
      throw new Error(`No invokable found for ${functionName}`)
    }

    return await this.invokeFunction(functionName, functionArgs)
  }

  async invokeFunction(
    functionName: string,
    functionArgs: Record<string, any>
  ) {
    const callableProperty = this[functionName as keyof this]

    if (typeof callableProperty !== 'function') {
      throw new Error(
        `Invokable ${functionName} is not a function on ${this.namespace}`
      )
    }

    return await callableProperty.call(this, functionArgs)
  }

  get invokables(): Invokable[] {
    return getInvocables(this)
  }
}
