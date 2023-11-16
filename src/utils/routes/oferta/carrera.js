import { BASE_OFERTA_URL } from '@/utils/consts'
import { appFetch } from '@/utils/fetchHandler'

export const carrera = {
  carrera: {
    get: async (_, { nivel, page, size }) => {
      return await appFetch(
        `${BASE_OFERTA_URL}/rye/carrera/carreras?nivel=${nivel}${page ? `&page=${page}` : ''}${
          size ? `&size=${size}` : ''
        }`
      )
    }
  },
  nivel: {
    switch_state: async (_, { id_nivel, estado }) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/nivel/actualizar`, {
        method: 'POST',
        body: JSON.stringify({ id_nivel, estado: !estado })
      })
    },
    get: async () => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/nivel/niveles`)
    },
    update: async (_, { id_nivel, ...data }) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/nivel/actualizar`, {
        method: 'POST',
        body: JSON.stringify({ id_nivel, ...data })
      })
    },
    add: async (_, data) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/nivel/nuevo`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    }
  },
  tipo_recurso: {
    get: async () => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/tipo_recurso/tipos_recurso`)
    },
    switch_state: async (_, { id_tipo_recurso, estado }) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/tipo_recurso/actualizar`, {
        method: 'POST',
        body: JSON.stringify({ id_tipo_recurso, estado: !estado })
      })
    },
    update: async (_, data) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/tipo_recurso/actualizar`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    add: async (_, data) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/tipo_recurso/nuevo`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    }
  }
}
