import { ApiInterface } from '../../apis/types'
import { ChatMessage } from '../../chat-agents/types'
import { renderApiInterfaces } from './invocations/render'

export function buildInitialPrompt({
  apis,
  directive,
}: {
  apis: ApiInterface[]
  directive: string
}): ChatMessage[] {
  return [
    {
      content: `You are WorkGpt, a helpful assistant that performs tasks.`,
      role: 'system',
    },
    {
      content: `
Your program runs in multiple turns until you have finshed the task. Your responses should be in Markdown.

These are the tools available to you:
${renderApiInterfaces(apis)}

Respond with a JSON object respecting the structure of WorkGptResponse every turn:

interface WorkGptResponse {
  thought: string // A thought, which is a summary of your current state of mind.
  reasoning: string[] // A list of steps you have taken to arrive at your current thought.
  plan: string[] // Short list that describes what you are going to do next.
  criticism: string // Constructive self-criticism.
  speak: string // Thoughts summary to say to user
  command: {
    tool: string // One of the tools listed above. e.g. \`ToolNamespace.toolFunction\`
    args: any[] // Function args, e.g: \`[ {"my": "args"} ]\`
  }
}

Wrap the JSON object in a Markdown code block, like this:
\`\`\`json
{
  "thought": "I am thinking...",
  ...
}
\`\`\`

You MUST reference a tool in your command. You MUST ONLY reference a tool that we have given to you.

Your directive is: ${directive}
`,
      role: 'user',
    },
  ]
}
