import { findLastMatch } from './regex-fns'

/**
 * This function extracts Json from a given Markdown string.
 * @param {string} markdown - The input Markdown string.
 * @returns {string} - The extracted Json code.
 * @throws {Error} - If Json code cannot be found in the Markdown string.
 */

export function parseJsonFromMarkdown(markdown: string): string {
  const match = findLastMatch(markdown, /```json([\s\S]*?)```/g)

  if (!match) {
    throw new Error('Could not find json snippet in markdown')
  }

  return match[1]
}

/**
 * This function extracts JavaScript code from a given Markdown string.
 * @param {string} markdown - The input Markdown string.
 * @returns {string} - The extracted JavaScript code.
 * @throws {Error} - If JavaScript code cannot be found in the Markdown string.
 */
export function parseJavaScriptFromMarkdown(markdown: string): string {
  // Matches:
  // ```javascript
  // const x = 1
  // ```

  // find last match
  const match = findLastMatch(markdown, /```javascript([\s\S]*?)```/g)

  if (!match) {
    throw new Error('Could not find javascript snippet in markdown')
  }

  return match[1]
}
