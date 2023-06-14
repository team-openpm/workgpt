import { z } from 'zod'
import { Api } from './base'
import { invokable } from './helpers/decorators'

describe('ApiBase', () => {
  class MyApi extends Api {
    @invokable({
      usage: 'myapi doSomething',
      schema: z.object({
        inputA: z.string().describe('inputA'),
        inputB: z.string().describe('inputB'),
      }),
    })
    doSomething({ inputA, inputB }: { inputA: string; inputB: string }) {
      return inputB + inputA
    }
  }

  const myApi = new MyApi()

  it('has interface', async () => {
    expect(myApi.functions).toMatchInlineSnapshot(`
      [
        {
          "description": "myapi doSomething",
          "name": "doSomething",
          "parameters": {
            "additionalProperties": false,
            "properties": {
              "inputA": {
                "description": "inputA",
                "type": "string",
              },
              "inputB": {
                "description": "inputB",
                "type": "string",
              },
            },
            "required": [
              "inputA",
              "inputB",
            ],
            "type": "object",
          },
        },
      ]
    `)
  })

  it('invokes', async () => {
    expect(
      await myApi.invoke({
        functionName: 'doSomething',
        functionArgs: { inputA: 'foo', inputB: 'bar' },
      })
    ).toEqual('barfoo')
  })
})
