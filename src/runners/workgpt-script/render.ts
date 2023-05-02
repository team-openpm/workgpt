import { indent } from '../../lib/string-fns'
import { GLOBAL_NAMESPACE, InvocationResult } from './types'

export function renderApiInterfaces(apis: { interface: string }[]) {
  const interfaces = apis.map((api) => indent(api.interface)).join('\n')

  return `
declare namespace ${GLOBAL_NAMESPACE} {
${interfaces}
}`
}

/**
 * Renders a string that describes the invocation results in a readable format.
 * @param results An array of InvocationResult objects.
 * @returns A single string that represents the invocation results.
 */
export function renderInvocationResults(results: InvocationResult[]): string {
  return `Invocation result:
${results.map(renderInvocationResult).join('\n')}`
}

/**
 * Renders a single InvocationResult object as a string.
 * @param invocationResult An InvocationResult object to render.
 * @returns A string representing the invocation result.
 */
function renderInvocationResult(invocationResult: InvocationResult): string {
  const { invocation, result } = invocationResult
  const { api, method, args } = invocation
  const argsString = args.map(renderArg).join(', ')

  return `\`${api.namespace}.${method}(${argsString})\` //=> ${result}`
}

/**
 * Renders an argument value as a string.
 * @param arg The argument value to render.
 * @returns A string representing the argument value.
 */
function renderArg(arg: any): string {
  if (typeof arg === 'string') {
    return `"${arg}"`
  } else if (typeof arg === 'number') {
    return arg.toString()
  } else if (typeof arg === 'boolean') {
    return arg.toString()
  } else if (arg === null) {
    return 'null'
  } else if (Array.isArray(arg)) {
    return `[${arg.map(renderArg).join(', ')}]`
  } else if (typeof arg === 'object') {
    return `{${Object.keys(arg)
      .map((key) => `${key}: ${renderArg(arg[key])}`)
      .join(', ')}}`
  } else {
    return 'undefined'
  }
}
