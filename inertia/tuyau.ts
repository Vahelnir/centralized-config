import { createTuyau, TuyauClient } from '@tuyau/client'
import { getClientKey } from '@tuyau/inertia/vue'
import { api } from '../.adonisjs/api.js'
import { inject } from 'vue'

type Api = typeof api
export type TuyauAppClient = TuyauClient<Api['definition'], Api['routes']>

export function createTuyauClient(baseUrl: string) {
  const client = createTuyau({
    api,
    baseUrl: baseUrl ?? '',
  })

  return client
}

export function useTuyau() {
  const client = inject<TuyauAppClient>(getClientKey())
  if (!client) {
    throw new Error('useTuyau() must be used inside an Inertia app')
  }

  return client
}
