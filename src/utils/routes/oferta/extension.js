import { BASE_OFERTA_URL } from '@/utils/consts'
import { appFetch } from '@/utils/fetchHandler'

export const extension = {
  get_all_permisos: async ({ id_extension }) => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/extension/permisos?id_extension=${id_extension}`)
  },
  update_permisos: async ({ data, id_extension }) => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/extension/permisos?id_extension=${id_extension}`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  get_permisos: async ({ id_extension }) => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/extension/extension_permisos?id_extension=${id_extension}`)
  },
  get_params_create: async () => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/extension/param_crear`)
  },
  get_carreras: async ({ extension }) => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/carreras_extension?extension=${extension}`)
  },
  add_carrera_unidad: async ({ nivel }) => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/extension/param_crear_carrera?nivel=${nivel}`)
  },
  add_carrera_params: async ({ nivel, id_unidad }) => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/param_crear_carrera?nivel=${nivel}&id_unidad=${id_unidad}`)
  },
  add_carrera: async data => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/nueva_carrera_extension`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  update_carrera: async data => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/actualizar_carrera`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  update_carrera_extension: async data => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/unidad/actualizar_carrera_extension`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  add: async data => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/extension/nuevo`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  get: async ({ unidad }) => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/extension/extensiones?unidad=${unidad}`)
  },
  update: async data => {
    return await appFetch(`${BASE_OFERTA_URL}/rye/extension/actualizar`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  permiso: {
    get: async () => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/permiso/permisos`)
    },
    add: async data => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/permiso/nuevo`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    update: async data => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/permiso/actualizar`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    switch_state: async ({ id_permiso, estado }) => {
      return await appFetch(`${BASE_OFERTA_URL}/rye/permiso/actualizar`, {
        method: 'POST',
        body: JSON.stringify({ id_permiso, estado: !estado })
      })
    }
  }
}
