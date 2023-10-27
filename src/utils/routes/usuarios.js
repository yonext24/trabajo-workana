import { BASE_URL, getToken } from '../consts'
import { fetchHandler } from '../fetchHandler'

export const usuarios = {
  roles: {
    get: async api => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/rol/roles`, { headers }).then(
        fetchHandler
      )
    },
    add: async (api, data) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/rol/nuevo`, {
        headers,
        method: 'POST',
        body: JSON.stringify(data)
      }).then(fetchHandler)
    },
    update: async (api, data) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/rol/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify(data)
      }).then(fetchHandler)
    },
    delete: async (api, { id_rol }) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/rol/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ id_rol, estado: false, actualizar: [] })
      }) // "actualizar" es necesario
        .then(fetchHandler)
    },
    getPermissions: async (api, id_rol) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/permiso/rol?rol=${id_rol}`, {
        headers
      }).then(fetchHandler)
    }
  },
  permisos: {
    get: async api => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/permiso/permisos`, { headers }).then(
        fetchHandler
      )
    },
    switchStates: async (api, { id_permiso, estado }) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/permiso/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ id_permiso, estado: !estado })
      }).then(fetchHandler)
    }
  }
}
