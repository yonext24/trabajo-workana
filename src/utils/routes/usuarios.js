import { BASE_URL, getToken } from '../consts'
import { fetchHandler } from '../fetchHandler'

export const usuarios = {
  usuarios: {
    create: async (api, data) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/usuario/nuevo`, {
        headers,
        method: 'POST',
        body: JSON.stringify(data)
      }).then(fetchHandler)
    },
    getParameters: async api => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/usuario/parametros`, {
        headers
      }).then(fetchHandler)
    },
    search: async (api, { cui, correo }) => {
      const { headers } = getToken(api)
      return await fetch(
        `${BASE_URL}/rye/usuario/buscar${correo ? `?correo=${correo}` : ''}&${
          cui ? `cui=${cui}` : ''
        }`,
        {
          headers
        }
      ).then(fetchHandler)
    },
    update: async (api, data) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/usuario/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify(data)
      }).then(fetchHandler)
    },
    delete: async (api, { usuario }) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/usuario/actualizar`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ usuario, estado: false })
      }).then(fetchHandler)
    }
  },
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
        body: JSON.stringify({ rol: { id_rol, estado: false }, actualizar: [] })
      }) // "actualizar" es necesario
        .then(fetchHandler)
    },
    getPermissions: async (api, id_rol) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/permiso/rol?rol=${id_rol}`, {
        headers
      }).then(fetchHandler)
    },
    getMappedPermissions: async (api, id_rol) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/permiso/modulo?id_rol=${id_rol}`, {
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
