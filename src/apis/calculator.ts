import { Parser } from 'expr-eval'

import { Api } from './base'
import { invokable } from './helpers/decorators'
import { z } from 'zod'

export class Calculator extends Api {
  @invokable({
    usage: `Useful for getting the result of a math expression. The input to this tool should be a valid mathematical expression that could be executed by a simple calculator.`,
    schema: z.object({
      input: z.string().describe('input'),
    }),
  })
  async evaluate({ input }: { input: string }): Promise<string> {
    try {
      const result = Parser.evaluate(input).toString()

      return result
    } catch (error) {
      return "I don't know how to do that."
    }
  }
}
