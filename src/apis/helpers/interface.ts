import { Invokable } from '../types'
import { zodToFunctionParameters } from '../../lib/zod-fns'
import { ChatFunction } from '../../chat-agents/types'

export function getChatFunction(invokable: Invokable): ChatFunction {
  const { name, description, schema } = invokable

  return {
    name,
    description,
    parameters: schema
      ? zodToFunctionParameters(schema)
      : {
          type: 'object',
          properties: {},
        },
  }
}
