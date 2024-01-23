import { BASE_OFERTA_URL } from '@/utils/consts'
import { appFetch } from '@/utils/fetchHandler'

export const unidad = {
  tipo: {
    get: async () => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/tipo_ua/tipos_ua`)
    },
    add: async (_, { nombre, descripcion }) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/tipo_ua/nuevo`, {
        method: 'POST',
        body: JSON.stringify({ nombre, descripcion })
      })
    },
    update: async (_, data) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/tipo_ua/actualizar`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    switch_state: async (_, { id_tipo_ua, estado }) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/tipo_ua/actualizar`, {
        method: 'POST',
        body: JSON.stringify({ id_tipo_ua, estado: !estado })
      })
    }
  },
  unidad: {
    params: async () => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/parametros_ua`)
    },
    get: async () => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/unidades`)
    },
    add: async (_, data) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/nuevo`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    switch_state: async (_, { id_unidad, estado }) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/actualizar`, {
        method: 'POST',
        body: JSON.stringify({ id_unidad, estado: !estado })
      })
    },
    update: async (_, data) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/actualizar`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    add_carrera: async data => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/nueva_carrera`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    get_carreras: async (id_unidad, id_nivel) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/carreras?unidad=${id_unidad}&nivel=${id_nivel}`)
    },
    update_carrera: async data => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/actualizar_carrera`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    }
  }
}
