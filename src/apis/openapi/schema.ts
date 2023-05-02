import { OpenAPI } from './openapi-types'
import { isArraySchemaObject, schemaAsZod } from './helpers/schema'

export class OpenApiSchema {
  private schema: OpenAPI.SchemaObject
  name: string | undefined
  required: boolean

  constructor(schema: OpenAPI.SchemaObject, name?: string, required = true) {
    this.schema = schema
    this.name = name
    this.required = required
  }

  get description(): string {
    return this.schema.description ?? ''
  }

  get type(): string | undefined {
    if (isArraySchemaObject(this.schema)) {
      return this.schema.items.type === 'string' ? 'string[]' : 'object[]'
    } else if (Array.isArray(this.schema.type)) {
      return this.schema.type[0]
    } else {
      return this.schema.type
    }
  }

  get properties() {
    const result: OpenApiSchema[] = []

    for (const name in this.schema.properties ?? {}) {
      const property = this.schema.properties![name]!
      const required = this.schema.required?.includes(name) ?? false
      result.push(new OpenApiSchema(property, name, required))
    }

    return result
  }

  get items(): OpenApiSchema | null {
    if (!isArraySchemaObject(this.schema)) {
      return null
    }

    if (this.schema.items.type === 'string') {
      return null
    }

    return new OpenApiSchema(this.schema.items)
  }

  get zodSchema() {
    return schemaAsZod(this.schema)
  }
}
