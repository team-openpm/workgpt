export class RunnerHalt extends Error {
  result: any

  constructor(result: any) {
    super('RunnerHalt')
    this.result = result
  }
}
