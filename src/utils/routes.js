import { fetchHandler } from './fetchHandler'

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'

const getToken = api => {
  const token = api.getState().auth.token
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  // throw new Error('testing')

  return { headers, token }
}

export const routes = {
  auth: {
    login: `${BASE_URL}/rye/usuario/token`,
    perfil: `${BASE_URL}/rye/usuario/perfil`
  },
  permisos: {
    permisos: `${BASE_URL}/rye/permiso/permisos`,
    parametros: `${BASE_URL}/rye/permiso/parametros`
  },
  general: {
    sectores: {
      get: async (api) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/sector/sectores`, { headers })
          .then(fetchHandler)
      },
      delete: async (api, { id_sector }) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/sector/actualizar`,
          { headers, method: 'POST', body: JSON.stringify({ id_sector, estado: false }) })
          .then(fetchHandler)
      },
      add: async (api, { nombre }) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/sector/nuevo`,
          { headers, method: 'POST', body: JSON.stringify({ estado: true, nombre }) })
          .then(fetchHandler)
      }
    },
    dependencias: {
      get: async (api) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/dependencia/dependencias`, { headers })
          .then(fetchHandler)
      },
      delete: async (api, { id_dependencia, id_unidad, id_sector, abreviatura }) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/dependencia/actualizar`,
          { headers, method: 'POST', body: JSON.stringify({ id_dependencia, id_unidad, id_sector, estado: false, abreviatura }) })
          .then(fetchHandler)
      },
      update: async (api, { id_dependencia, id_unidad, id_sector, abreviatura }) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/dependencia/actualizar`,
          { headers, method: 'POST', body: JSON.stringify({ id_dependencia, id_unidad, id_sector, estado: true, abreviatura }) })
          .then(fetchHandler)
      }
    }
  }
}
