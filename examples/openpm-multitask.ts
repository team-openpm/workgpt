import { z } from 'zod'
import { Api, invokable } from '../src/apis'
import { Calculator } from '../src/apis/calculator'
import { FactApi } from '../src/apis/fact'
import { OpenpmApi } from '../src/apis/openpm'
import { OpenAiAgent } from '../src/chat-agents/open-ai'
import { haltProgram } from '../src/runners/control'
import { WorkGptRunner } from '../src/runners/workgpt'
import { TextBrowser } from '../src/apis/text-browser'

export class WorkGptControl extends Api {
  @invokable({
    usage: 'Finishes the program. Call with the result.',
    schema: z.object({
      dates: z.array(
        z.object({
          date: z.string().describe('Date, in YYYY-MM-DD format'),
          weather: z.string().describe('Weather for the date'),
        })
      ),
    }),
  })
  onFinish(result: any) {
    haltProgram(result)
  }
}

async function main() {
  const agent = new OpenAiAgent({
    verbose: true,
    temperature: 0,
    model: 'gpt-4-0613',
  })

  const apis = await Promise.all([
    OpenpmApi.fromPackageId('serpapi-search', {
      authKey: process.env.SERPAPI_API_KEY!,
    }),
    new TextBrowser(),
    new Calculator(),
    new FactApi(),
    new WorkGptControl(),
  ])

  const runner = new WorkGptRunner({
    agent,
    apis,
  })

  const result = await runner.runWithDirective(
    `
    Run these commands in order. Think carefully step by step. 
    1. What is the five day forecast for San Francisco?
    2. Format this forecast into a list of dates and weather. The current date is ${new Date()
      .toISOString()
      .slice(0, 10)}.
    `
  )

  console.log('Result', JSON.stringify(result, null, 2))
}

main()
