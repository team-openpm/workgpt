export function camelCase(str: string) {
  return str
    .replace(/\s/g, '')
    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function classify(str: string) {
  return camelCase(str).replace(/^[a-z]/, (letter) => letter.toUpperCase())
}
