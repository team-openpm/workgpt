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
      pricingPlans: z.array(
        z.object({
          planName: z.string(),
          planAmount: z.string(),
          planDescription: z.string().optional(),
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

  const apis = await Promise.all([new TextBrowser(), new WorkGptControl()])

  const runner = new WorkGptRunner({
    agent,
    apis,
  })

  const result = await runner.runWithDirective(
    `
    You purpose is to extract pricing plans from SAAS service websites.
    Follow the instructions below. Think step by step.
    1. Navigate to hubspot.com
    2. Find the pricing page for their CRM.
    3. Extract the text of the page to understand the service's different pricing plans.
    3. Call WorkGptControl.onFinish with the parsed pricing plans.`
  )

  console.log('Result', JSON.stringify(result, null, 2))
}

main()
