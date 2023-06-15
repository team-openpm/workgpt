# workgpt

[![NPM version](https://img.shields.io/npm/v/workgpt?color=a1b858&label=)](https://www.npmjs.com/package/workgpt)

## Install

```bash
npm install workgpt
```

## Usage

```typescript
import { Calculator } from 'workgpt/apis/calculator'
import { FactApi } from 'workgpt/apis/fact'
import { OpenpmApi } from 'workgpt/apis/openpm'
import { OpenAiAgent } from 'workgpt/chat-agents/open-ai'
import { WorkGptRunner } from 'workgpt/runners/workgpt'

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
  onResult: (result) => {
    console.log('Result', result)
  },
})

await runner.runWithDirective(
  'What is the city related to the ip address 76.220.35.234 and what is the population of that city?'
)
```

## License

MIT
