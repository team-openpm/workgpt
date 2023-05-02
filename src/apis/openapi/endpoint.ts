import { OpenApiSchema } from './schema'
import { OpenAPI } from './openapi-types'
import { z } from 'zod'
import { parametersToSchema } from './helpers/schema'
import { first, notEmpty } from '../../lib/array-fns'
import { AuthOption } from './types'

export class OpenApiEndpoint {
  path: string
  method: OpenAPI.HttpMethods
  servers: OpenAPI.ServerObject[]
  security: OpenAPI.SecurityRequirementObject[]
  securitySchemes: Record<string, OpenAPI.SecuritySchemeObject>
  operation: OpenAPI.Operation

  constructor({
    servers,
    securitySchemes,
    path,
    method,
    security,
    operation,
  }: {
    servers: OpenAPI.ServerObject[]
    securitySchemes: Record<string, OpenAPI.SecuritySchemeObject>
    path: string
    method: OpenAPI.HttpMethods
    security: OpenAPI.SecurityRequirementObject[]
    operation: OpenAPI.Operation
  }) {
    this.servers = servers
    this.securitySchemes = securitySchemes
    this.path = path
    this.method = method
    this.operation = operation
    this.security = security
  }

  get description(): string {
    return this.operation.description || this.operation.summary || ''
  }

  get parameters(): OpenAPI.Parameter[] {
    return this.operation.parameters ?? []
  }

  get parametersSchema(): OpenApiSchema | null {
    if (this.parameters.length === 0) {
      return null
    }

    return new OpenApiSchema(parametersToSchema(this.parameters))
  }

  get combinedServers() {
    return (this.operation.servers ?? []).concat(this.servers)
  }

  get origin() {
    const url = first(this.combinedServers)?.url

    if (!url) {
      return null
    }

    // Strip trailing slash
    return url.replace(/\/$/, '')
  }

  get bodySchema() {
    if (this.method === 'get') {
      return null
    }

    const result =
      this.operation.requestBody?.content?.['application/json']?.schema
    return result ? new OpenApiSchema(result) : null
  }

  get responseSchema() {
    const schema =
      this.operation.responses?.['200']?.content?.['application/json']?.schema

    if (!schema) {
      return null
    }

    return new OpenApiSchema(schema)
  }

  getAuthFor(authKey: string | undefined): AuthOption | undefined {
    if (!authKey) {
      return
    }

    const security = this.favoredSecurityScheme

    if (!security) {
      return
    }

    if (security.type === 'oauth2') {
      return {
        in: 'header',
        key: 'Authorization',
        value: `Bearer ${authKey}`,
      }
    }

    if (security.type === 'http') {
      return {
        in: 'header',
        key: 'Authorization',
        value: `${security.scheme === 'basic' ? 'Basic' : 'Bearer'} ${authKey}`,
      }
    }

    if (security.type === 'apiKey') {
      if (security.in === 'header') {
        return {
          in: 'header',
          key: 'Authorization',
          value: `Bearer ${authKey}`,
        }
      }

      if (security.in === 'query') {
        return {
          in: 'query',
          key: security.name,
          value: authKey,
        }
      }
    }
  }

  /**
   * Getter function that returns the string representing the API method and the path.
   *
   * Example:
   *  method: 'get'
   *  path: '/users/{id}'
   * returns: 'get_users_id'
   *
   * @return {string} API method and path as a single string.
   */
  get apiMethod(): string {
    const pathPart = this.path
      .replace(/[}{]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/^_/, '')

    return `${this.method}_${pathPart}`
  }

  get apiSchema(): z.ZodTuple | null {
    const pathSchema = this.parametersSchema?.zodSchema ?? null
    const bodySchema = this.bodySchema?.zodSchema ?? null

    if (pathSchema && bodySchema) {
      return z.tuple([pathSchema, bodySchema])
    }

    if (pathSchema) {
      return z.tuple([pathSchema])
    }

    if (bodySchema) {
      return z.tuple([bodySchema])
    }

    return null
  }

  get apiResponseSchema(): z.ZodType<any> | null {
    const responseSchema = this.responseSchema

    if (!responseSchema) {
      return null
    }

    return responseSchema.zodSchema
  }

  get apiUsage(): string {
    return this.description
  }

  private get operationSecuritySchemes() {
    const securityReqs = [...this.security, ...(this.operation.security || [])]

    const securityTypes = securityReqs
      .map((security) => Object.keys(security))
      .flat()

    const schemes = securityTypes.map(
      (securityType) => this.securitySchemes[securityType]
    )

    return schemes.filter(notEmpty)
  }

  private get favoredSecurityScheme() {
    const schemes = this.operationSecuritySchemes

    // Sort schemes by type:
    //  first http
    //  then apiKey (only header)
    //  then oauth2

    const getSortIndex = (scheme: OpenAPI.SecuritySchemeObject) => {
      if (scheme.type === 'http') {
        return 0
      }

      if (scheme.type === 'apiKey' && scheme.in === 'header') {
        return 1
      }

      if (scheme.type === 'oauth2') {
        return 2
      }

      return 3
    }

    schemes.sort((a, b) => getSortIndex(a) - getSortIndex(b))

    return first(schemes)
  }
}
