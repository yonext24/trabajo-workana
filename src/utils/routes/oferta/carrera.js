import { BASE_OFERTA_URL, getToken } from '@/utils/consts'
import { fetchHandler } from '@/utils/fetchHandler'

export const carrera = {
  nivel: {
    switch_state: async (api, { id_nivel, estado }) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/nivel/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ id_nivel, estado: !estado })
      }).then(fetchHandler)
    },
    get: async api => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/nivel/niveles`, {
        headers
      }).then(fetchHandler)
    },
    update: async (api, { id_nivel, ...data }) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/nivel/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ id_nivel, ...data })
      }).then(fetchHandler)
    },
    add: async (api, data) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/nivel/nuevo`, {
        headers,
        method: 'POST',
        body: JSON.stringify(data)
      }).then(fetchHandler)
    }
  },
  tipo_recurso: {
    get: async api => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/tipo_recurso/tipos_recurso`, {
        headers
      }).then(fetchHandler)
    },
    switch_state: async (api, { id_tipo_recurso, estado }) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/tipo_recurso/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ id_tipo_recurso, estado: !estado })
      }).then(fetchHandler)
    },
    update: async (api, data) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/tipo_recurso/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify(data)
      }).then(fetchHandler)
    },
    add: async (api, data) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/tipo_recurso/nuevo`, {
        headers,
        method: 'POST',
        body: JSON.stringify(data)
      }).then(fetchHandler)
    }
  }
}
