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
    delete: async (api, { id_tipo_ua }) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_OFERTA_URL}/rye/tipo_ua/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ id_tipo_ua, estado: false })
      }).then(fetchHandler)
    }
  }
}
