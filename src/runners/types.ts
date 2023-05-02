export class RunnerHalt extends Error {
  result: any

  constructor(result: any) {
    super('RunnerHalt')
    this.result = result
  }
}

export class RunnerContinue extends Error {
  result: any

  constructor(result: any) {
    super('RunnerContinue')
    this.result = result
  }
}

export class ManagedError extends Error {
  error: any

  constructor(error: any) {
    super('ManagedError')
    this.error = error
  }
}
