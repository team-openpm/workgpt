import { InvocationResult } from './types'

export function renderApiInterfaces(apis: { interface: string }[]) {
  return apis.map((api) => api.interface).join('\n')
}

/**
 * Renders a single InvocationResult object as a string.
 * @param invocationResult An InvocationResult object to render.
 * @returns A string representing the invocation result.
 */
export function renderInvocationResult(
  invocationResult: InvocationResult
): string {
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
