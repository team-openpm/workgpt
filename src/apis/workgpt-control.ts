import { z } from 'zod'
import { Api } from './base'
import { invokable } from './helpers/decorators'
import { haltProgram } from '../runners/control'

export class WorkGptControl extends Api {
  @invokable({
    usage:
      'Finishes the program. Call `onFinish(result?: string)` when you have an answer, or you have finished the task you were given.',
    schema: z.object({
      result: z.string().optional().describe('result'),
    }),
  })
  onFinish({ result }: { result?: string }) {
    haltProgram(result)
  }
}
