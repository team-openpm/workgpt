export interface AuthOption {
  in: 'header' | 'query'
  key: string
  value: string
}

export interface OpenApiOptions {
  onBeforeRequest?: (request: Request) => Request
  authKey?: string
}
