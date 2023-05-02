import { ApiInterface, Invokable } from './types'
import { buildInterface } from './helpers/interface'
import { getInvokableInterface, getInvocables } from './helpers/decorators'

export const invokableMetadataKey = Symbol('invokable')

export abstract class Api implements ApiInterface {
  get namespace() {
    return this.constructor.name
  }

  get interface(): string {
    return buildInterface(
      this.namespace,
      this.invokables.map(getInvokableInterface).join('\n')
    )
  }

  async invoke({
    method,
    args,
  }: {
    method: string
    args: any[]
  }): Promise<string> {
    const invokable = this.invokables.find((i) => i.method === method)

    if (!invokable) {
      throw new Error(`No invokable found for ${method}`)
    }

    if (!Array.isArray(args)) {
      throw new Error(`Args must be an array`)
    }

    const parsedArgs = invokable.schema
      ? await invokable.schema.parseAsync(args)
      : []

    return await this.invokeMethod(method, parsedArgs)
  }

  async invokeMethod(method: string, args: any[]): Promise<string> {
    const callableProperty = this[method as keyof this]

    if (typeof callableProperty !== 'function') {
      throw new Error(
        `Invokable ${method} is not a function on ${this.namespace}`
      )
    }

    return await callableProperty.apply(this, args)
  }

  get invokables(): Invokable[] {
    return getInvocables(this)
  }
}
