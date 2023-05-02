import 'reflect-metadata'
import { z } from 'zod'
import { Invokable } from '../types'
import { printArgumentSchema, printSchema } from '../../lib/zod-fns'
import { wrapInComment } from '../../lib/string-fns'
import { invokableMetadataKey } from '../base'

export function invokable({
  usage,
  schema = null,
  responseSchema = null,
}: {
  usage: string | (() => string)

  // Schema should be an array
  schema?: z.ZodType | null

  responseSchema?: z.ZodType | null
}) {
  return function (
    target: object,
    method: string,
    descriptor: PropertyDescriptor
  ) {
    const existingInvokables = getInvocables(target)

    existingInvokables.push({
      method,
      usage: typeof usage === 'string' ? usage : usage(),
      schema,
      responseSchema,
    })

    setInvocables(target, existingInvokables)

    return descriptor.get ?? descriptor.value
  }
}
export function getInvokableInterface(invokable: Invokable): string {
  const { method, usage, schema, responseSchema } = invokable

  // Ensure that every new line of usage starts with //
  const usageLines = wrapInComment(usage)

  let definition = `function ${method}(`

  if (schema) {
    definition += printArgumentSchema(schema)
  }

  definition += `): Promise<`

  if (responseSchema) {
    definition += printSchema(responseSchema)
  } else {
    definition += 'any'
  }

  definition += '>'

  return [usageLines, definition].join('\n')
}

export function getInvocables(target: object): Invokable[] {
  return Reflect.getMetadata(invokableMetadataKey, target) ?? []
}

export function setInvocables(target: object, invocables: Invokable[]) {
  Reflect.defineMetadata(invokableMetadataKey, invocables, target)
}
