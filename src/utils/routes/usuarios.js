import { BASE_URL } from '../consts'
import { appFetch } from '../fetchHandler'

export const usuarios = {
  usuarios: {
    create: async (_, data) => {
      return await appFetch(`${BASE_URL}/rye/usuario/nuevo`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    getParameters: async () => {
      return await appFetch(`${BASE_URL}/rye/usuario/parametros`)
    },
    search: async (_, { cui, correo }) => {
      return await appFetch(
        `${BASE_URL}/rye/usuario/buscar?${correo ? `correo=${correo}` : ''}&${cui ? `cui=${cui}` : ''}`
      )
    },
    update: async (_, data) => {
      return await appFetch(`${BASE_URL}/rye/usuario/actualizar`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    change_role: async data => {
      return await appFetch(`${BASE_URL}/rye/usuario/asignar_rol`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    delete: async (_, { usuario }) => {
      return await appFetch(`${BASE_URL}/rye/usuario/dar_baja_usuario?id_rol_usuario=${usuario}`, {
        method: 'POST',
        body: JSON.stringify({ usuario, estado: false })
      })
    }
  },
  roles: {
    get: async () => {
      return await appFetch(`${BASE_URL}/rye/rol/roles`)
    },
    add: async (_, data) => {
      return await appFetch(`${BASE_URL}/rye/rol/nuevo`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    update: async (_, data) => {
      return await appFetch(`${BASE_URL}/rye/rol/actualizar`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    switch_state: async (_, { id_rol, estado }) => {
      return await appFetch(`${BASE_URL}/rye/rol/actualizar`, {
        method: 'POST',
        body: JSON.stringify({ rol: { id_rol, estado: !estado }, actualizar: [] })
      }) // "actualizar" es necesario
    },
    getPermissions: async (_, id_rol) => {
      return await appFetch(`${BASE_URL}/rye/permiso/rol?rol=${id_rol}`)
    },
    getMappedPermissions: async (_, id_rol) => {
      return await appFetch(`${BASE_URL}/rye/permiso/modulo?id_rol=${id_rol}`)
    }
  },
  permisos: {
    get: async () => {
      return await appFetch(`${BASE_URL}/rye/permiso/permisos`)
    },
    create: async (_, data) => {
      return await appFetch(`${BASE_URL}/rye/permiso/nuevo`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    },
    switchStates: async (_, { id_permiso, estado }) => {
      return await appFetch(`${BASE_URL}/rye/permiso/actualizar?id_permiso=${id_permiso}&estado=${!estado}`, {
        method: 'POST'
      })
    },
    unidades: async () => {
      return await appFetch(`${BASE_URL}/rye/permiso/prueba_unidades`)
    },
    extensiones: async () => {
      return await appFetch(`${BASE_URL}/rye/permiso/prueba_extensiones`)
    }
  }
}
