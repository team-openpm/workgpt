# workgpt

[![NPM version](https://img.shields.io/npm/v/workgpt?color=a1b858&label=)](https://www.npmjs.com/package/workgpt)

WorkGPT is an agent framework in a similar fashion to AutoGPT or LangChain. You give it a directive and an array of APIs and it will converse back and forth with the AI until its directive is complete.

For example, a directive could be to research the web for something, to crawl a website, or to order you an Uber. We support any and all APIs that can be represented with an OpenAPI file.

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
})

const result = await runner.runWithDirective(
  'What is the city related to the ip address 76.220.35.234 and what is the population of that city?'
)

console.log('Result', result)
```

## What is OpenPM

You'll notice that we're using an OpenPM API in the example above. [OpenPM](https://openpm.ai) is a package manager for OpenAPI files. In the example you can see we've pulled in a package from OpenPM called `ipinfo` to be used for looking up IP addresses.

You don't have to use OpenPM. We support importing any arbitrary OpenAPI file. You can see that we're smart about authentication. You just need to pass an `authKey` and the library will figure out how to authorize itself. All the endpoints in the API will be exposed as local functions to the LLM, ready to be invoked.

## Crawling example

We include an example of using Puppeteer as a text-based browser to give the LLM access to the web. You'll notice that the text-based browser passes out all the HTML and just returns text. This is actually enough for GPT-4, which is smart enough to extract data from the plain text.

We can pass our own custom API to the LLM as a finishing program API that the LLM can call whenever it's finished. The advantage of this is that you can give it a schema to follow, which is great when trying to extract data from a webpage.

```typescript
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
  onFinish(result: any) {
    haltProgram(result)
  }
}

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
  'Get the featured funding rounds of https://www.crunchbase.com'
)

console.log('Result', JSON.stringify(result, null, 2))
```

## License

MIT
