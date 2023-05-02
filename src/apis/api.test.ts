import { z } from 'zod'
import { Api } from './base'
import { invokable } from './helpers/decorators'

describe('ApiBase', () => {
  class MyApi extends Api {
    @invokable({
      usage: 'myapi doSomething',
      schema: z.tuple([z.string(), z.string()]),
    })
    doSomething(inputA: string, inputB: string) {
      return inputB + inputA
    }
  }

  const myApi = new MyApi()

  it('has interface', async () => {
    expect(myApi.interface).toMatchInlineSnapshot(`
      "namespace MyApi {
        // myapi doSomething
        function doSomething(string, string): any
      }"
    `)
  })

  it('invokes', async () => {
    expect(
      await myApi.invoke({ method: 'doSomething', args: ['foo', 'bar'] })
    ).toEqual('barfoo')
  })
})
