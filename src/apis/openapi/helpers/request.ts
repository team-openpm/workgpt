import { OpenAPI } from '../openapi-types'
import { isPresent } from '../../../lib/is-empty'
import { AuthOption } from '../types'

export function safeParseUrl(url: string) {
  try {
    return new URL(url)
  } catch (err) {
    return null
  }
}

interface RequestOptions {
  path: string
  origin: string
  method?: OpenAPI.HttpMethods
  pathParams: Record<string, any>
  bodyParams: Record<string, any>
  auth?: AuthOption
}

export function buildRequest({
  path,
  origin,
  method = OpenAPI.HttpMethods.GET,
  pathParams,
  bodyParams,
  auth,
}: RequestOptions): Request {
  const url = buildUrl({
    origin,
    path,
    pathParams: {
      ...pathParams,
      ...getAuthSearchParams(auth),
    },
  })

  const hasBody = isPresent(bodyParams)

  return new Request(url, {
    body: hasBody ? JSON.stringify(bodyParams) : undefined,
    method,
    headers: {
      Accept: 'application/json',
      ...(hasBody && { 'Content-Type': 'application/json' }),
      ...getAuthHeaders(auth),
    },
  })
}

export function buildUrl({
  path,
  origin,
  pathParams,
}: {
  path: string
  origin: string
  pathParams: Record<string, any>
}): URL {
  const query = new URLSearchParams()

  // Replace {pathParms} in path with values from pathParams
  for (const [key, value] of Object.entries(pathParams)) {
    if (path.includes(`{${key}}`)) {
      path = path.replaceAll(`{${key}}`, value)
    } else {
      query.set(key, value)
    }
  }

  const url = new URL(origin + path)

  if (query.toString()) {
    url.search = query.toString()
  }

  return url
}

function getAuthHeaders(auth: AuthOption | undefined): HeadersInit {
  if (auth?.in !== 'header') {
    return {}
  }

  const headers: HeadersInit = {}
  headers[auth.key] = auth.value

  return headers
}

function getAuthSearchParams(
  auth: AuthOption | undefined
): Record<string, string> {
  if (auth?.in !== 'query') {
    return {}
  }

  const query: Record<string, string> = {}
  query[auth.key] = auth.value

  return query
}
