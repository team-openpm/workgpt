import semver from 'semver'

import { OpenApiEndpoint } from './endpoint'
import { safeParseUrl } from './helpers/request'
import { OpenAPI } from './openapi-types'
import OpenAPIParser from '@readme/openapi-parser'
import { clone } from '../../lib/clone'
import { first } from '../../lib/array-fns'
import { isEmpty } from '../../lib/is-empty'

export class OpenApiDocument {
  static async fromDocument(document: any) {
    if (!isOpenApi3(document)) {
      throw new Error('Only OpenAPI >= 3.0 documents are supported.')
    }

    const parsed = await OpenAPIParser.validate(clone(document), {
      dereference: { circular: 'ignore' },
    })

    return new this(parsed)
  }

  document: OpenAPI.Document

  constructor(document: OpenAPI.Document) {
    this.document = document
  }

  get name(): string | null {
    return this.document.info.title ?? null
  }

  get license(): string | null {
    return this.document.info.license?.name ?? null
  }

  get allServerUrls(): string[] {
    const urls: string[] = []

    if (this.document.servers) {
      this.document.servers.map((server) => urls.push(server.url))
    }

    const paths = this.document.paths

    if (paths) {
      for (const pathObject of Object.values(paths)) {
        if (pathObject?.servers) {
          pathObject.servers.map((server) => urls.push(server.url))
        }
      }
    }

    return urls
  }

  get hostname(): string | null {
    const firstUrl = first(this.allServerUrls)

    if (!firstUrl) {
      return null
    }

    const url = safeParseUrl(firstUrl)
    return url?.hostname ?? null
  }

  get origin(): string | null {
    const origin = this.document.servers?.[0]?.url

    if (!origin) {
      return null
    }

    // Strip trailing slash
    return origin.replace(/\/$/, '')
  }

  get description(): string | null {
    return this.document.info.description ?? null
  }

  get version(): string | null {
    const value = this.document.info.version

    if (!value) {
      return null
    }

    return semver.valid(semver.coerce(value))
  }

  get endpoints() {
    const results: OpenApiEndpoint[] = []

    for (const path in this.document.paths ?? {}) {
      const pathObject = this.document.paths![path]!
      const servers = (pathObject.servers ?? []).concat(this.servers)

      for (const method of Object.values(OpenAPI.HttpMethods)) {
        if (pathObject[method]) {
          results.push(
            new OpenApiEndpoint({
              path,
              method,
              operation: pathObject[method]!,
              servers,
              security: this.security,
              securitySchemes: this.securitySchemes,
            })
          )
        }
      }
    }

    return results
  }

  get paths() {
    return this.endpoints.map((endpoint) => endpoint.path)
  }

  get hasAuthentication(): boolean {
    return !isEmpty(this.securitySchemes)
  }

  get hasOauth(): boolean {
    return Object.values(this.securitySchemes).some(
      (scheme) => scheme.type === 'oauth2'
    )
  }

  get hasApiKey(): boolean {
    return Object.values(this.securitySchemes).some(
      (scheme) => scheme.type === 'apiKey' || scheme.type === 'http'
    )
  }

  get securitySchemes(): Record<string, OpenAPI.SecuritySchemeObject> {
    return this.document.components?.securitySchemes ?? {}
  }

  get security(): OpenAPI.SecurityRequirementObject[] {
    return this.document.security ?? []
  }

  get servers(): OpenAPI.ServerObject[] {
    return this.document.servers ?? []
  }
}

function isOpenApi3(document: any): document is OpenAPI.Document {
  const version = document?.openapi ?? ''
  return version.startsWith('3.')
}
