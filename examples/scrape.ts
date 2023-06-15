import { z } from 'zod'
import { Api, invokable } from '../src/apis'
import { OpenAiAgent } from '../src/chat-agents/open-ai'
import { WorkGptRunner } from '../src/runners/workgpt'
import { haltProgram } from '../src/runners/control'
import { TextBrowser } from '../src/apis/text-browser'

export class WorkGptControl extends Api {
  @invokable({
    usage: 'Finishes the program. Call when you have an answer.',
    schema: z.object({
      fundingRounds: z.array(
        z.object({
          organizationName: z.string(),
          transactionName: z.string(),
          moneyRaised: z.string(),
          leadInvestors: z.array(z.string()),
        })
      ),
    }),
  })
  onFinish(result: { city: string; population: number }) {
    haltProgram(result)
  }
}

async function main() {
  const agent = new OpenAiAgent({
    verbose: true,
    temperature: 0,
    model: 'gpt-4-0613',
  })

  const apis = await Promise.all([new TextBrowser(), new WorkGptControl()])

  const runner = new WorkGptRunner({
    agent,
    apis,
    onResult: (result) => {
      console.log('Result', JSON.stringify(result, null, 2))
    },
  })

  await runner.runWithDirective(
    'Get the featured funding rounds of https://www.crunchbase.com'
  )
}

main()
