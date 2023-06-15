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

  it('has functions', async () => {
    expect(myApi.functions).toMatchInlineSnapshot(`
      [
        {
          "description": "myapi doSomething",
          "name": "MyApi_doSomething",
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

  it('has invokables', async () => {
    expect(myApi.invokables.map((i) => i.name)).toMatchInlineSnapshot(`
      [
        "MyApi_doSomething",
      ]
    `)
  })

  it('invokes', async () => {
    const invokable = myApi.invokables[0]

    expect(invokable).toBeTruthy()
    expect(invokable.name).toEqual('MyApi_doSomething')

    expect(await invokable.callback({ inputA: 'foo', inputB: 'bar' })).toEqual(
      'barfoo'
    )
  })
})
