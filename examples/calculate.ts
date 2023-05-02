import { Calculator } from '../src/apis/calculator'
import { OpenApiAgent } from '../src/chat-agents/openapi'
import { WorkGptRunner } from '../src/runners/workgpt'

async function main() {
  const agent = new OpenApiAgent({
    verbose: true,
    temperature: 0.1,
    model: 'gpt-4',
  })

  const apis = [new Calculator()]

  const runner = new WorkGptRunner({
    agent,
    apis,
  })

  await runner.runWithDirective('What is 1 + 1?')
}

main()
