// Find the last match of a regex in a string
// Make sure the regex has the global flag
export function findLastMatch(str: string, regex: RegExp) {
  // Reset the regex index
  regex.lastIndex = 0

  // Find all matches and convert the iterator to an array
  const matches = [...str.matchAll(regex)]

  // Return the last match
  return matches.pop() ?? null
}
