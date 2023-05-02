import { Api } from '../../../apis'
import { z } from 'zod'
import { assertString } from '../../../lib/assert'
import { Invocation } from './types'

const agentSchema = z.object({
  thought: z.string(),
  reasoning: z.array(z.string()),
  plan: z.array(z.string()),
  criticism: z.string(),
  speak: z.string(),
  command: z.object({
    tool: z.string(),
    args: z.array(z.any()),
  }),
})

export async function parseInvocation(
  source: string,
  apis: Api[]
): Promise<Invocation> {
  const json = JSON.parse(source)
  const parsed = await agentSchema.parseAsync(json)

  const namespaceParts = parsed.command.tool.split('.')
  const method = namespaceParts.pop()
  const namespace = namespaceParts.join('.')

  assertString(
    method,
    `Invalid tool: ${parsed.command.tool}. Only use tools that we have given you.`
  )
  assertString(
    namespace,
    `Invalid tool: ${parsed.command.tool}. Only use tools that we have given you.`
  )

  const api = apis.find((api) => api.namespace === namespace)

  if (!api) {
    throw new Error(`Could not find tool for namespace: ${namespace}`)
  }

  return {
    api,
    method,
    args: parsed.command.args,
  }
}
