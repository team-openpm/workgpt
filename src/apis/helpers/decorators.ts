import 'reflect-metadata'
import { z } from 'zod'
import { Invokable } from '../types'
import { invokableMetadataKey } from '../base'

export function invokable({
  usage,
  schema,
}: {
  usage: string | (() => string)

  // Schema should be an array
  schema?: z.ZodObject<any, any>
}) {
  return function (
    target: object,
    functionName: string,
    descriptor: PropertyDescriptor
  ) {
    const existingInvokables = getInvocables(target)
    const namespace = target.constructor.name

    existingInvokables.push({
      name: `${namespace}_${functionName}`,
      description: typeof usage === 'string' ? usage : usage(),
      schema,
      callback: descriptor.get ?? descriptor.value,
    })

    setInvocables(target, existingInvokables)

    return descriptor.get ?? descriptor.value
  }
}
export function getInvocables(target: object): Invokable[] {
  return Reflect.getMetadata(invokableMetadataKey, target) ?? []
}

export function setInvocables(target: object, invocables: Invokable[]) {
  Reflect.defineMetadata(invokableMetadataKey, invocables, target)
}
