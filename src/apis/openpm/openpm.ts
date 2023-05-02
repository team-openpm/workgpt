import { getPackage } from './client'
import { OpenApi } from '../openapi/openapi'
import { OpenApiDocument } from '../openapi/document'
import { OpenApiOptions } from '../openapi/types'

export class OpenpmApi {
  static async fromPackageId(packageId: string, options: OpenApiOptions = {}) {
    const pkg = await getPackage(packageId)
    const json = JSON.parse(pkg.openapi)
    const doc = await OpenApiDocument.fromDocument(json)

    return new OpenApi(doc, options)
  }
}
