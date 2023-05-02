import ts from 'typescript'
import { z } from 'zod'
import { zodToTs, printNode } from 'zod-to-ts'

export function printSchema(schema: z.ZodTypeAny): string {
  const { node } = zodToTs(schema, 'Random')

  const result = printNode(node, {
    newLine: ts.NewLineKind.LineFeed,
    omitTrailingSemicolon: true,
  })

  // Strip new lines
  return result.replace(/\n\s*/g, ' ')
}

// Returns a CSV schema for use as function arguments
export function printArgumentSchema(schema: z.ZodType): string {
  const isTuple = schema instanceof z.ZodTuple

  const result = printSchema(schema)

  // Strip the first '[ ' and last ' ]'
  return isTuple ? result.slice(2, -2) : result
}
