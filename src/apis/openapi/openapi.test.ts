import { OpenApi } from './openapi'
import openpm from './fixtures/openpm.json'
import { zodToFunctionParameters } from '../../lib/zod-fns'

describe('OpenApi', async () => {
  const api = await OpenApi.fromDocument(openpm)

  it('should create an OpenApi instance from a document', () => {
    expect(
      api.invokables.map((i) => [
        i.name,
        i.usage,
        i.schema ? zodToFunctionParameters(i.schema) : null,
      ])
    ).toMatchInlineSnapshot(`
      [
        [
          "Openpm_get_packages",
          "Returns all packages",
          {
            "additionalProperties": false,
            "properties": {
              "path": {
                "additionalProperties": false,
                "properties": {
                  "limit": {
                    "description": "How many package to return per page (default 500)",
                    "type": "number",
                  },
                  "page": {
                    "description": "Page number (default 1)",
                    "type": "number",
                  },
                },
                "type": "object",
              },
            },
            "required": [
              "path",
            ],
            "type": "object",
          },
        ],
        [
          "Openpm_post_packages",
          "Creates a package",
          {
            "additionalProperties": false,
            "properties": {
              "body": {
                "additionalProperties": false,
                "properties": {
                  "contact_email": {
                    "description": "Package contact email",
                    "type": "string",
                  },
                  "created_at": {
                    "description": "Package creation date",
                    "type": "string",
                  },
                  "description": {
                    "description": "Package description",
                    "type": "string",
                  },
                  "domain": {
                    "description": "Package domain",
                    "type": "string",
                  },
                  "id": {
                    "description": "Package id",
                    "type": "string",
                  },
                  "legal_info_url": {
                    "description": "Package legal info url",
                    "type": "string",
                  },
                  "logo_url": {
                    "description": "Package logo url",
                    "type": "string",
                  },
                  "machine_description": {
                    "description": "Package description (for machines)",
                    "type": "string",
                  },
                  "machine_name": {
                    "description": "Package name (for machines)",
                    "type": "string",
                  },
                  "name": {
                    "description": "Package name",
                    "type": "string",
                  },
                  "openapi": {
                    "description": "Package OpenAPI specification",
                    "type": "string",
                  },
                  "published_at": {
                    "description": "Package publication date",
                    "type": "string",
                  },
                  "updated_at": {
                    "description": "Package last update date",
                    "type": "string",
                  },
                  "user_id": {
                    "description": "Package owner user id",
                    "type": "string",
                  },
                  "version": {
                    "description": "Package version",
                    "type": "string",
                  },
                },
                "type": "object",
              },
            },
            "required": [
              "body",
            ],
            "type": "object",
          },
        ],
        [
          "Openpm_get_packages_search",
          "Searches packages",
          {
            "additionalProperties": false,
            "properties": {
              "path": {
                "additionalProperties": false,
                "properties": {
                  "limit": {
                    "description": "How many package to return per page (default 10)",
                    "type": "number",
                  },
                  "proxy": {
                    "description": "Enable to use openpm's proxy",
                    "type": "boolean",
                  },
                  "query": {
                    "description": "Search query",
                    "type": "string",
                  },
                },
                "required": [
                  "query",
                ],
                "type": "object",
              },
            },
            "required": [
              "path",
            ],
            "type": "object",
          },
        ],
        [
          "Openpm_get_packages_lookup",
          "Looks up packages by id",
          {
            "additionalProperties": false,
            "properties": {
              "path": {
                "additionalProperties": false,
                "properties": {
                  "ids": {
                    "description": "CSV list of package ids",
                    "type": "string",
                  },
                },
                "type": "object",
              },
            },
            "required": [
              "path",
            ],
            "type": "object",
          },
        ],
        [
          "Openpm_get_packages_connected",
          "Looks up packages that are connected to the current user",
          {
            "additionalProperties": false,
            "properties": {
              "path": {
                "additionalProperties": false,
                "properties": {
                  "proxy": {
                    "description": "Enable to use openpm's proxy",
                    "type": "boolean",
                  },
                },
                "type": "object",
              },
            },
            "required": [
              "path",
            ],
            "type": "object",
          },
        ],
        [
          "Openpm_get_packages_packageId",
          "Returns a package",
          {
            "additionalProperties": false,
            "properties": {
              "path": {
                "additionalProperties": false,
                "properties": {
                  "packageId": {
                    "description": "Package id",
                    "type": "string",
                  },
                  "proxy": {
                    "description": "Enable to use openpm's proxy",
                    "type": "boolean",
                  },
                },
                "required": [
                  "packageId",
                ],
                "type": "object",
              },
            },
            "required": [
              "path",
            ],
            "type": "object",
          },
        ],
        [
          "Openpm_post_packages_packageId",
          "Updates a package",
          {
            "additionalProperties": false,
            "properties": {
              "body": {
                "additionalProperties": false,
                "properties": {
                  "contact_email": {
                    "description": "Package contact email",
                    "type": "string",
                  },
                  "created_at": {
                    "description": "Package creation date",
                    "type": "string",
                  },
                  "description": {
                    "description": "Package description",
                    "type": "string",
                  },
                  "domain": {
                    "description": "Package domain",
                    "type": "string",
                  },
                  "id": {
                    "description": "Package id",
                    "type": "string",
                  },
                  "legal_info_url": {
                    "description": "Package legal info url",
                    "type": "string",
                  },
                  "logo_url": {
                    "description": "Package logo url",
                    "type": "string",
                  },
                  "machine_description": {
                    "description": "Package description (for machines)",
                    "type": "string",
                  },
                  "machine_name": {
                    "description": "Package name (for machines)",
                    "type": "string",
                  },
                  "name": {
                    "description": "Package name",
                    "type": "string",
                  },
                  "openapi": {
                    "description": "Package OpenAPI specification",
                    "type": "string",
                  },
                  "published_at": {
                    "description": "Package publication date",
                    "type": "string",
                  },
                  "updated_at": {
                    "description": "Package last update date",
                    "type": "string",
                  },
                  "user_id": {
                    "description": "Package owner user id",
                    "type": "string",
                  },
                  "version": {
                    "description": "Package version",
                    "type": "string",
                  },
                },
                "type": "object",
              },
              "path": {
                "additionalProperties": false,
                "properties": {
                  "packageId": {
                    "description": "Package id",
                    "type": "string",
                  },
                },
                "required": [
                  "packageId",
                ],
                "type": "object",
              },
            },
            "required": [
              "path",
              "body",
            ],
            "type": "object",
          },
        ],
        [
          "Openpm_get_packages_packageId_openapi",
          "Returns an OpenAPI spec",
          {
            "additionalProperties": false,
            "properties": {
              "path": {
                "additionalProperties": false,
                "properties": {
                  "format": {
                    "description": "Format of the OpenAPI spec (default json)",
                    "type": "string",
                  },
                  "packageId": {
                    "description": "Package id",
                    "type": "string",
                  },
                },
                "required": [
                  "packageId",
                ],
                "type": "object",
              },
            },
            "required": [
              "path",
            ],
            "type": "object",
          },
        ],
        [
          "Openpm_get_packages_packageId_ai_plugin",
          "Returns an OpenAI plugin manifest",
          {
            "additionalProperties": false,
            "properties": {
              "path": {
                "additionalProperties": false,
                "properties": {
                  "packageId": {
                    "description": "Package id",
                    "type": "string",
                  },
                },
                "required": [
                  "packageId",
                ],
                "type": "object",
              },
            },
            "required": [
              "path",
            ],
            "type": "object",
          },
        ],
        [
          "Openpm_get_ai_plugins_search",
          "Searches packages and responds with the ai-plugin manifest",
          {
            "additionalProperties": false,
            "properties": {
              "path": {
                "additionalProperties": false,
                "properties": {
                  "limit": {
                    "description": "How many package to return per page (default 10)",
                    "type": "number",
                  },
                  "query": {
                    "description": "Search query",
                    "type": "string",
                  },
                },
                "required": [
                  "query",
                ],
                "type": "object",
              },
            },
            "required": [
              "path",
            ],
            "type": "object",
          },
        ],
        [
          "Openpm_get_ai_plugins_lookup",
          "Looks up ai-plugins by package ids",
          {
            "additionalProperties": false,
            "properties": {
              "path": {
                "additionalProperties": false,
                "properties": {
                  "ids": {
                    "description": "CSV list of package ids",
                    "type": "string",
                  },
                },
                "type": "object",
              },
            },
            "required": [
              "path",
            ],
            "type": "object",
          },
        ],
      ]
    `)
  })
})
