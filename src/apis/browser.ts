import { Parser } from 'expr-eval'

import { Api } from './base'
import { invokable } from './helpers/decorators'
import { z } from 'zod'

export class BrowserApi extends Api {
  @invokable({
    usage: `Useful for.`,
    schema: z.tuple([z.string().describe('expression')]),
  })
  async evaluate(input: string) {
    try {
      const result = Parser.evaluate(input).toString()

      return result
    } catch (error) {
      return "I don't know how to do that."
    }
  }
}
