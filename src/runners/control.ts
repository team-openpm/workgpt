import { RunnerContinue, RunnerHalt } from './types'

export function haltProgram(result: any) {
  throw new RunnerHalt(result)
}

export function continueProgram(result: any) {
  throw new RunnerContinue(result)
}
