import { ApiInterface } from '../../apis/types'
import { ChatMessage } from '../../chat-agents/types'
import { renderApiInterfaces } from './render'

export function buildInitialPrompt({
  apis,
  directive,
}: {
  apis: ApiInterface[]
  directive: string
}): ChatMessage[] {
  return [
    {
      content: `You are WorkGPT, a helpful assistant that helps performs pieces of work.`,
      role: 'system',
    },
    {
      content: `
Your program runs in multiple turns until you have an answer. Every turn, you should output:

- A thought, which is a summary of your current state of mind.
- Reasoning
- Plan
- Criticism
- And lastly JavaScript calls to invoke any APIs we give you.

Your responses should be in Markdown.

These are the APIs available to you:
${renderApiInterfaces(apis)}

ONLY invoke the APIs that we give you. Do not invoke any other APIs.

To invoke an API, use the following syntax:
\`\`\`javascript
const data = await WorkGpt.MyApi.get()
await WorkGpt.WorkGptControl.onContinue(data)
\`\`\`

I will then respond with the result of the API call.
If you are done with your program, call \`WorkGptControl.onDone(any)\` to finish the program.

Your directive is: ${directive}
`,
      role: 'user',
    },
  ]
}
