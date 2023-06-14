import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

export function zodToFunctionParameters(schema: z.ZodTypeAny) {
  const jsonSchema = zodToJsonSchema(schema, 'mySchema')
  return jsonSchema.definitions!.mySchema
}
