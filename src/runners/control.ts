import { RunnerHalt } from './types'

export function haltProgram(result: any): never {
  throw new RunnerHalt(result)
}
