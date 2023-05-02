import { Calculator } from '../src/apis/calculator'
import { FactApi } from '../src/apis/fact'
import { OpenpmApi } from '../src/apis/openpm'
import { OpenApiAgent } from '../src/chat-agents/openapi'
import { WorkGptScriptRunner } from '../src/runners/workgpt-script'

// This is an experimental script runner that allows the assistant to run JavaScript

async function main() {
  const agent = new OpenApiAgent({
    verbose: true,
    temperature: 0.1,
    model: 'gpt-4',
  })

  const apis = await Promise.all([
    OpenpmApi.fromPackageId('ipinfo', {
      authKey: process.env.IPINFO_API_KEY!,
    }),
    new Calculator(),
    new FactApi(),
  ])

  const runner = new WorkGptScriptRunner({
    agent,
    apis,
    onResult: (result) => {
      console.log('Result', result)
    },
  })

  await runner.runWithDirective(
    'What is the city related to the ip address 76.220.35.234 and what is the population of that city?'
  )
}

main()
