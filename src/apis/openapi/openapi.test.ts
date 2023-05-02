import { OpenApi } from './openapi'
import openpm from './fixtures/openpm.json'
import { printSchema } from '../../lib/zod-fns'

describe('OpenApi', async () => {
  const api = await OpenApi.fromDocument(openpm)

  it('should create an OpenApi instance from a document', () => {
    expect(
      api.invokables.map((i) => [
        i.method,
        i.usage,
        i.schema ? printSchema(i.schema) : null,
      ])
    ).toMatchInlineSnapshot(`
      [
        [
          "get_packages",
          "Returns all packages",
          "[ { /** How many package to return per page (default 500) */ limit?: number | undefined; /** Page number (default 1) */ page?: number | undefined; } ]",
        ],
        [
          "post_packages",
          "Creates a package",
          "[ { /** Package id */ id?: string | undefined; /** Package name */ name?: string | undefined; /** Package name (for machines) */ machine_name?: string | undefined; /** Package domain */ domain?: string | undefined; /** Package version */ version?: string | undefined; /** Package creation date */ created_at?: string | undefined; /** Package last update date */ updated_at?: string | undefined; /** Package publication date */ published_at?: string | undefined; /** Package logo url */ logo_url?: string | undefined; /** Package contact email */ contact_email?: string | undefined; /** Package legal info url */ legal_info_url?: string | undefined; /** Package description */ description?: string | undefined; /** Package description (for machines) */ machine_description?: string | undefined; /** Package owner user id */ user_id?: string | undefined; /** Package OpenAPI specification */ openapi?: string | undefined; } ]",
        ],
        [
          "get_packages_search",
          "Searches packages",
          "[ { /** How many package to return per page (default 10) */ limit?: number | undefined; /** Search query */ query: string; /** Enable to use openpm's proxy */ proxy?: boolean | undefined; } ]",
        ],
        [
          "get_packages_lookup",
          "Looks up packages by id",
          "[ { /** CSV list of package ids */ ids?: string | undefined; } ]",
        ],
        [
          "get_packages_connected",
          "Looks up packages that are connected to the current user",
          "[ { /** Enable to use openpm's proxy */ proxy?: boolean | undefined; } ]",
        ],
        [
          "get_packages_packageId",
          "Returns a package",
          "[ { /** Package id */ packageId: string; /** Enable to use openpm's proxy */ proxy?: boolean | undefined; } ]",
        ],
        [
          "post_packages_packageId",
          "Updates a package",
          "[ { /** Package id */ packageId: string; }, { /** Package id */ id?: string | undefined; /** Package name */ name?: string | undefined; /** Package name (for machines) */ machine_name?: string | undefined; /** Package domain */ domain?: string | undefined; /** Package version */ version?: string | undefined; /** Package creation date */ created_at?: string | undefined; /** Package last update date */ updated_at?: string | undefined; /** Package publication date */ published_at?: string | undefined; /** Package logo url */ logo_url?: string | undefined; /** Package contact email */ contact_email?: string | undefined; /** Package legal info url */ legal_info_url?: string | undefined; /** Package description */ description?: string | undefined; /** Package description (for machines) */ machine_description?: string | undefined; /** Package owner user id */ user_id?: string | undefined; /** Package OpenAPI specification */ openapi?: string | undefined; } ]",
        ],
        [
          "get_packages_packageId_openapi",
          "Returns an OpenAPI spec",
          "[ { /** Package id */ packageId: string; /** Format of the OpenAPI spec (default json) */ format?: string | undefined; } ]",
        ],
        [
          "get_packages_packageId_ai_plugin",
          "Returns an OpenAI plugin manifest",
          "[ { /** Package id */ packageId: string; } ]",
        ],
        [
          "get_ai_plugins_search",
          "Searches packages and responds with the ai-plugin manifest",
          "[ { /** How many package to return per page (default 10) */ limit?: number | undefined; /** Search query */ query: string; } ]",
        ],
        [
          "get_ai_plugins_lookup",
          "Looks up ai-plugins by package ids",
          "[ { /** CSV list of package ids */ ids?: string | undefined; } ]",
        ],
      ]
    `)
  })

  it('namespace', () => {
    expect(api.namespace).toMatchInlineSnapshot('"Openpm"')
  })

  it('interface', () => {
    expect(api.interface).toMatchInlineSnapshot(`
      "namespace Openpm {
        // Returns all packages
        function get_packages({ /** How many package to return per page (default 500) */ limit?: number | undefined; /** Page number (default 1) */ page?: number | undefined; }): { items?: { /** Package id */ id?: string | undefined; /** Package name */ name?: string | undefined; /** Package name (for machines) */ machine_name?: string | undefined; /** Package domain */ domain?: string | undefined; /** Package version */ version?: string | undefined; /** Package creation date */ created_at?: string | undefined; /** Package last update date */ updated_at?: string | undefined; /** Package publication date */ published_at?: string | undefined; /** Package logo url */ logo_url?: string | undefined; /** Package contact email */ contact_email?: string | undefined; /** Package legal info url */ legal_info_url?: string | undefined; /** Package description */ description?: string | undefined; /** Package description (for machines) */ machine_description?: string | undefined; /** Package owner user id */ user_id?: string | undefined; }[] | undefined; total?: number | undefined; page?: number | undefined; limit?: number | undefined; }
        // Creates a package
        function post_packages({ /** Package id */ id?: string | undefined; /** Package name */ name?: string | undefined; /** Package name (for machines) */ machine_name?: string | undefined; /** Package domain */ domain?: string | undefined; /** Package version */ version?: string | undefined; /** Package creation date */ created_at?: string | undefined; /** Package last update date */ updated_at?: string | undefined; /** Package publication date */ published_at?: string | undefined; /** Package logo url */ logo_url?: string | undefined; /** Package contact email */ contact_email?: string | undefined; /** Package legal info url */ legal_info_url?: string | undefined; /** Package description */ description?: string | undefined; /** Package description (for machines) */ machine_description?: string | undefined; /** Package owner user id */ user_id?: string | undefined; /** Package OpenAPI specification */ openapi?: string | undefined; }): { /** Package id */ id?: string | undefined; /** Package name */ name?: string | undefined; /** Package name (for machines) */ machine_name?: string | undefined; /** Package domain */ domain?: string | undefined; /** Package version */ version?: string | undefined; /** Package creation date */ created_at?: string | undefined; /** Package last update date */ updated_at?: string | undefined; /** Package publication date */ published_at?: string | undefined; /** Package logo url */ logo_url?: string | undefined; /** Package contact email */ contact_email?: string | undefined; /** Package legal info url */ legal_info_url?: string | undefined; /** Package description */ description?: string | undefined; /** Package description (for machines) */ machine_description?: string | undefined; /** Package owner user id */ user_id?: string | undefined; /** Package OpenAPI specification */ openapi?: string | undefined; }
        // Searches packages
        function get_packages_search({ /** How many package to return per page (default 10) */ limit?: number | undefined; /** Search query */ query: string; /** Enable to use openpm's proxy */ proxy?: boolean | undefined; }): { /** Package id */ id?: string | undefined; /** Package name */ name?: string | undefined; /** Package name (for machines) */ machine_name?: string | undefined; /** Package domain */ domain?: string | undefined; /** Package version */ version?: string | undefined; /** Package creation date */ created_at?: string | undefined; /** Package last update date */ updated_at?: string | undefined; /** Package publication date */ published_at?: string | undefined; /** Package logo url */ logo_url?: string | undefined; /** Package contact email */ contact_email?: string | undefined; /** Package legal info url */ legal_info_url?: string | undefined; /** Package description */ description?: string | undefined; /** Package description (for machines) */ machine_description?: string | undefined; /** Package owner user id */ user_id?: string | undefined; /** Package OpenAPI specification */ openapi?: string | undefined; }[]
        // Looks up packages by id
        function get_packages_lookup({ /** CSV list of package ids */ ids?: string | undefined; }): { /** Package id */ id?: string | undefined; /** Package name */ name?: string | undefined; /** Package name (for machines) */ machine_name?: string | undefined; /** Package domain */ domain?: string | undefined; /** Package version */ version?: string | undefined; /** Package creation date */ created_at?: string | undefined; /** Package last update date */ updated_at?: string | undefined; /** Package publication date */ published_at?: string | undefined; /** Package logo url */ logo_url?: string | undefined; /** Package contact email */ contact_email?: string | undefined; /** Package legal info url */ legal_info_url?: string | undefined; /** Package description */ description?: string | undefined; /** Package description (for machines) */ machine_description?: string | undefined; /** Package owner user id */ user_id?: string | undefined; /** Package OpenAPI specification */ openapi?: string | undefined; }[]
        // Looks up packages that are connected to the current user
        function get_packages_connected({ /** Enable to use openpm's proxy */ proxy?: boolean | undefined; }): { /** Package id */ id?: string | undefined; /** Package name */ name?: string | undefined; /** Package name (for machines) */ machine_name?: string | undefined; /** Package domain */ domain?: string | undefined; /** Package version */ version?: string | undefined; /** Package creation date */ created_at?: string | undefined; /** Package last update date */ updated_at?: string | undefined; /** Package publication date */ published_at?: string | undefined; /** Package logo url */ logo_url?: string | undefined; /** Package contact email */ contact_email?: string | undefined; /** Package legal info url */ legal_info_url?: string | undefined; /** Package description */ description?: string | undefined; /** Package description (for machines) */ machine_description?: string | undefined; /** Package owner user id */ user_id?: string | undefined; /** Package OpenAPI specification */ openapi?: string | undefined; }[]
        // Returns a package
        function get_packages_packageId({ /** Package id */ packageId: string; /** Enable to use openpm's proxy */ proxy?: boolean | undefined; }): { /** Package id */ id?: string | undefined; /** Package name */ name?: string | undefined; /** Package name (for machines) */ machine_name?: string | undefined; /** Package domain */ domain?: string | undefined; /** Package version */ version?: string | undefined; /** Package creation date */ created_at?: string | undefined; /** Package last update date */ updated_at?: string | undefined; /** Package publication date */ published_at?: string | undefined; /** Package logo url */ logo_url?: string | undefined; /** Package contact email */ contact_email?: string | undefined; /** Package legal info url */ legal_info_url?: string | undefined; /** Package description */ description?: string | undefined; /** Package description (for machines) */ machine_description?: string | undefined; /** Package owner user id */ user_id?: string | undefined; /** Package OpenAPI specification */ openapi?: string | undefined; }
        // Updates a package
        function post_packages_packageId({ /** Package id */ packageId: string; }, { /** Package id */ id?: string | undefined; /** Package name */ name?: string | undefined; /** Package name (for machines) */ machine_name?: string | undefined; /** Package domain */ domain?: string | undefined; /** Package version */ version?: string | undefined; /** Package creation date */ created_at?: string | undefined; /** Package last update date */ updated_at?: string | undefined; /** Package publication date */ published_at?: string | undefined; /** Package logo url */ logo_url?: string | undefined; /** Package contact email */ contact_email?: string | undefined; /** Package legal info url */ legal_info_url?: string | undefined; /** Package description */ description?: string | undefined; /** Package description (for machines) */ machine_description?: string | undefined; /** Package owner user id */ user_id?: string | undefined; /** Package OpenAPI specification */ openapi?: string | undefined; }): { /** Package id */ id?: string | undefined; /** Package name */ name?: string | undefined; /** Package name (for machines) */ machine_name?: string | undefined; /** Package domain */ domain?: string | undefined; /** Package version */ version?: string | undefined; /** Package creation date */ created_at?: string | undefined; /** Package last update date */ updated_at?: string | undefined; /** Package publication date */ published_at?: string | undefined; /** Package logo url */ logo_url?: string | undefined; /** Package contact email */ contact_email?: string | undefined; /** Package legal info url */ legal_info_url?: string | undefined; /** Package description */ description?: string | undefined; /** Package description (for machines) */ machine_description?: string | undefined; /** Package owner user id */ user_id?: string | undefined; /** Package OpenAPI specification */ openapi?: string | undefined; }
        // Returns an OpenAPI spec
        function get_packages_packageId_openapi({ /** Package id */ packageId: string; /** Format of the OpenAPI spec (default json) */ format?: string | undefined; }): { openapi?: string | undefined; info?: { title?: string | undefined; version?: string | undefined; description?: string | undefined; } | undefined; }
        // Returns an OpenAI plugin manifest
        function get_packages_packageId_ai_plugin({ /** Package id */ packageId: string; }): { schema_version?: string | undefined; name_for_human?: string | undefined; name_for_model?: string | undefined; description_for_human?: string | undefined; description_for_model?: string | undefined; auth?: { type?: string | undefined; } | undefined; api?: { type?: string | undefined; url?: string | undefined; is_user_authenticated?: boolean | undefined; } | undefined; logo_url?: string | undefined; contact_email?: string | undefined; legal_info_url?: string | undefined; }
        // Searches packages and responds with the ai-plugin manifest
        function get_ai_plugins_search({ /** How many package to return per page (default 10) */ limit?: number | undefined; /** Search query */ query: string; }): { schema_version?: string | undefined; name_for_human?: string | undefined; name_for_model?: string | undefined; description_for_human?: string | undefined; description_for_model?: string | undefined; auth?: { type?: string | undefined; } | undefined; api?: { type?: string | undefined; url?: string | undefined; is_user_authenticated?: boolean | undefined; } | undefined; logo_url?: string | undefined; contact_email?: string | undefined; legal_info_url?: string | undefined; }[]
        // Looks up ai-plugins by package ids
        function get_ai_plugins_lookup({ /** CSV list of package ids */ ids?: string | undefined; }): { schema_version?: string | undefined; name_for_human?: string | undefined; name_for_model?: string | undefined; description_for_human?: string | undefined; description_for_model?: string | undefined; auth?: { type?: string | undefined; } | undefined; api?: { type?: string | undefined; url?: string | undefined; is_user_authenticated?: boolean | undefined; } | undefined; logo_url?: string | undefined; contact_email?: string | undefined; legal_info_url?: string | undefined; }[]
      }"
    `)
  })
})
