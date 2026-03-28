'use server'

type AdInput = {
  sponsor: string
  title: string
  lines: string[]
  clickUrl?: string | null
}

type AdUpdateInput = Partial<AdInput> & {
  isActive?: boolean
}

const proxyUrl = process.env.PROXY_URL || process.env.NEXT_PUBLIC_PROXY_URL || 'http://localhost:4021'
const adminApiKey = process.env.ADSHELL_ADMIN_API_KEY || process.env.ADMIN_API_KEY || 'adshell-admin'

async function proxyFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${proxyUrl}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': adminApiKey,
      ...init?.headers,
    },
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: response.statusText }))
    const message =
      typeof errorBody === 'object' &&
      errorBody !== null &&
      'error' in errorBody &&
      typeof errorBody.error === 'string'
        ? errorBody.error
        : response.statusText

    throw new Error(message)
  }

  return response.json() as Promise<T>
}

export async function listAds<T>() {
  return proxyFetch<T>('/admin/ads')
}

export async function createAd<T>(payload: AdInput) {
  return proxyFetch<T>('/admin/ads', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updateAd<T>(id: string, payload: AdUpdateInput) {
  return proxyFetch<T>(`/admin/ads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export async function deleteAd<T>(id: string) {
  return proxyFetch<T>(`/admin/ads/${id}`, {
    method: 'DELETE',
  })
}

export async function getAdStats<T>(id: string) {
  return proxyFetch<T>(`/admin/ads/${id}/stats`)
}
