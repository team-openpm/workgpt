export function isEmpty(value: any) {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  )
}

export function isPresent(value: any) {
  return !isEmpty(value)
}
