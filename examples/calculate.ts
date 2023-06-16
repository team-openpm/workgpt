import { Calculator } from '../src/apis/calculator'
import { OpenAiAgent } from '../src/chat-agents/open-ai'
import { WorkGptRunner } from '../src/runners/workgpt'

async function main() {
  const agent = new OpenAiAgent({
    verbose: true,
    temperature: 0,
  })

  const apis = [new Calculator()]

  const runner = new WorkGptRunner({
    agent,
    apis,
  })

  const result = await runner.runWithDirective('What is 1 + 1?')

  console.log('Result', result)
}

main()
