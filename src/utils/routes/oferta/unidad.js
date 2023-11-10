import { BASE_OFERTA_URL, getToken } from '@/utils/consts'
import { fetchHandler } from '@/utils/fetchHandler'

export const unidad = {
  tipo: {
    get: async api => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/tipo_ua/tipos_ua`, {
        headers
      }).then(fetchHandler)
    },
    add: async (api, { nombre, descripcion }) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/tipo_ua/nuevo`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ nombre, descripcion })
      }).then(fetchHandler)
    },
    update: async (api, data) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/tipo_ua/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify(data)
      }).then(fetchHandler)
    },
    switch_state: async (api, { id_tipo_ua, estado }) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/tipo_ua/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ id_tipo_ua, estado: !estado })
      }).then(fetchHandler)
    }
  },
  unidad: {
    get: async api => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/unidad/unidades`, {
        headers
      }).then(fetchHandler)
    },
    add: async (api, data) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/unidad/nuevo`, {
        headers,
        method: 'POST',
        body: JSON.stringify(data)
      }).then(fetchHandler)
    },
    switch_state: async (api, { id_unidad, estado }) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/unidad/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ id_unidad, estado: !estado })
      }).then(fetchHandler)
    },
    update: async (api, data) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/unidad/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify(data)
      }).then(fetchHandler)
    }
  }
}
