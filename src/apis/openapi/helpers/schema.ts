import { z } from 'zod'
import { OpenAPI } from '../openapi-types'

export function isArraySchemaObject(
  schema: OpenAPI.SchemaObject
): schema is OpenAPI.ArraySchemaObject {
  return schema.type === 'array' && typeof schema.items === 'object'
}

export function schemaAsZod(
  schema: OpenAPI.SchemaObject,
  required?: boolean
): z.ZodType {
  if (!schema) {
    return z.any()
  }

  let zodType: z.ZodType

  switch (schema.type) {
    case 'object':
      zodType = z.object(
        Object.fromEntries(
          Object.entries(schema.properties ?? {}).map(([key, value]) => [
            key,
            schemaAsZod(value, schema.required?.includes(key) ?? false),
          ])
        )
      )
      break

    case 'array':
      zodType = z.array(schemaAsZod(schema.items))
      break
    case 'string':
      zodType = z.string()
      break
    case 'number':
      zodType = z.number()
      break
    case 'integer':
      zodType = z.number()
      break
    case 'boolean':
      zodType = z.boolean()
      break
    case 'null':
      zodType = z.null()
      break
    default:
      // Handle referenced schemas objects that might not have a type
      if (schema.properties) {
        zodType = schemaAsZod({ type: 'object', properties: schema.properties })
      } else {
        zodType = z.string()
      }
  }

  if (schema.description) {
    zodType = zodType.describe(schema.description)
  }

  if (required === false) {
    zodType = zodType.optional()
  }

  return zodType
}

export function parametersToSchema(
  parameters: OpenAPI.Parameter[]
): OpenAPI.SchemaObject {
  return {
    type: 'object',
    required: parameters
      .filter((param) => param.required)
      .map((param) => param.name),
    properties: parameters.reduce((acc, param) => {
      if (param.schema && isArraySchemaObject(param.schema)) {
        acc[param.name] = {
          type: param.schema?.type ?? 'array',
          items: param.schema.items,
          description: param.description,
        }
      } else {
        acc[param.name] = {
          type: param.schema?.type ?? 'string',
          description: param.description,
        }
      }

      return acc
    }, {} as Record<string, OpenAPI.SchemaObject>),
  }
}
