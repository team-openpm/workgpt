import { Calculator } from '../src/apis/calculator'
import { DadJokeApi } from '../src/apis/dadjoke'
import { OpenAiAgent } from '../src/chat-agents/open-ai'
import { WorkGptRunner } from '../src/runners/workgpt'

async function main() {
  const agent = new OpenAiAgent({ verbose: true, temperature: 0.5 })

  const apis = [new Calculator(), new DadJokeApi()]

  const runner = new WorkGptRunner({
    agent,
    apis,
  })

  const result = await runner.runWithDirective('Give me a joke about sailing')

  console.log('Result', result)
}

main()
