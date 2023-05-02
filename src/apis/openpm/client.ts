import { Package } from './types'

interface GetPackageOptions {
  proxy?: boolean
}

export const openpmEndpoint = 'https://openpm.ai/api'

export async function getPackage(
  packageId: string,
  { proxy }: GetPackageOptions = {}
): Promise<Package> {
  const url = new URL(`${openpmEndpoint}/packages/${packageId}`)

  if (proxy) {
    url.searchParams.set('proxy', 'true')
  }

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(
      `Failed to fetch plugin from ${url} with status ${response.status}`
    )
  }

  const json = await response.json()

  return json as Package
}

export const getApiKey = (): string | null => {
  if (typeof process !== 'undefined') {
    return process.env.OPENPM_API_KEY ?? null
  }

  return null
}
