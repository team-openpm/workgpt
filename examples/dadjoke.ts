import { Calculator } from '../src/apis/calculator'
import { DadJokeApi } from '../src/apis/dadjoke'
import { OpenApiAgent } from '../src/chat-agents/openapi'
import { WorkGptRunner } from '../src/runners/workgpt'

async function main() {
  const agent = new OpenApiAgent({ verbose: true, temperature: 0.5 })

  const apis = [new Calculator(), new DadJokeApi()]

  const runner = new WorkGptRunner({
    agent,
    apis,
  })

  await runner.runWithDirective('Give me a joke about sailing')
}

main()
