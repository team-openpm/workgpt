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
    method: string,
    descriptor: PropertyDescriptor
  ) {
    const existingInvokables = getInvocables(target)

    existingInvokables.push({
      name: method,
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
