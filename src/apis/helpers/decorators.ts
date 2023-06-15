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
  schema?: z.AnyZodObject
}) {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const existingInvokables = getPrivateInvocables(target)

    existingInvokables.push({
      propertyKey,
      usage: typeof usage === 'string' ? usage : usage(),
      schema,
    })

    setPrivateInvocables(target, existingInvokables)

    return descriptor.get ?? descriptor.value
  }
}

export function getInvocables(target: object): Invokable[] {
  const invokables = getPrivateInvocables(target)
  const namespace = target.constructor.name

  return invokables.map((invokable) => ({
    ...invokable,
    name: `${namespace}_${invokable.propertyKey}`,
    callback: (target as any)[invokable.propertyKey].bind(target),
  }))
}

interface PrivateInvokable {
  usage: string
  propertyKey: string
  schema?: z.AnyZodObject
}

function getPrivateInvocables(target: object): PrivateInvokable[] {
  return Reflect.getMetadata(invokableMetadataKey, target) ?? []
}

function setPrivateInvocables(target: object, invocables: PrivateInvokable[]) {
  Reflect.defineMetadata(invokableMetadataKey, invocables, target)
}
