import { z } from 'zod'
import { Api, invokable } from '../src/apis'
import { Calculator } from '../src/apis/calculator'
import { FactApi } from '../src/apis/fact'
import { OpenpmApi } from '../src/apis/openpm'
import { OpenAiAgent } from '../src/chat-agents/open-ai'
import { WorkGptRunner } from '../src/runners/workgpt'
import { haltProgram } from '../src/runners/control'

export class WorkGptControl extends Api {
  @invokable({
    usage:
      'Finishes the program. Call when you have an answer, or you have finished the task you were given.',
    schema: z.object({
      city: z.string(),
      population: z.number(),
    }),
  })
  onFinish(result: { city: string; population: number }) {
    haltProgram(result)
  }
}

async function main() {
  const agent = new OpenAiAgent({
    verbose: true,
    temperature: 0.1,
    model: 'gpt-4-0613',
  })

  const apis = await Promise.all([
    OpenpmApi.fromPackageId('ipinfo', {
      authKey: process.env.IPINFO_API_KEY!,
    }),
    new Calculator(),
    new FactApi(),
  ])

  const runner = new WorkGptRunner({
    agent,
    apis,
  })

  const result = await runner.runWithDirective(
    'What is the city related to the ip address 76.220.35.234 and what is the population of that city?'
  )

  console.log('Result', result)
}

main()
