import { z } from 'zod'
import { Api } from './base'
import { invokable } from './helpers/decorators'
import { continueProgram, haltProgram } from '../runners/control'

export class WorkGptControl extends Api {
  @invokable({
    usage:
      'Finishes the program. Call `onFinish(result?: string)` when you have an answer, or you have finished the task you were given.',
    schema: z.tuple([z.string().optional().describe('result')]),
  })
  onFinish(result?: string) {
    haltProgram(result)
  }

  @invokable({
    usage: 'Continues the program. Call `onContinue(result?: string)`.',
    schema: z.tuple([z.string().optional().describe('result')]),
  })
  onContinue(result?: any) {
    continueProgram(result)
  }
}
