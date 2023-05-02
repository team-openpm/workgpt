export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined
}

export function first<T>(array: T[]): T | undefined {
  return array[0]
}

export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1]
}
