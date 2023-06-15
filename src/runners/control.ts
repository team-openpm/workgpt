import { RunnerHalt } from './types'

export function haltProgram(result: any) {
  throw new RunnerHalt(result)
}
