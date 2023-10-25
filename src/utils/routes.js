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
    perfil: `${BASE_URL}/rye/usuario/perfil`,
    changePassword: async (api, data) => {
      const { headers } = getToken(api)
      return await fetch(`${BASE_URL}/rye/usuario/actualizar_contrasenia`,
        { headers, method: 'POST', body: JSON.stringify(data) })
        .then(fetchHandler)
    }
  },
  permisos: {
    permisos: `${BASE_URL}/rye/permiso/permisos`,
    parametros: `${BASE_URL}/rye/modulo/parametros`
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
      },
      add: async (api, { id_unidad, id_sector, abreviatura, nombre }) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/dependencia/nuevo`,
          { headers, method: 'POST', body: JSON.stringify({ id_unidad, id_sector, estado: true, abreviatura, nombre }) })
          .then(fetchHandler)
      }
    },
    puestos: {
      get: async (api) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/puesto/puestos`, { headers })
          .then(fetchHandler)
      },
      delete: async (api, { id_puesto }) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/puesto/actualizar`,
          { headers, method: 'POST', body: JSON.stringify({ id_puesto, estado: false }) })
          .then(fetchHandler)
      },
      add: async (api, { descripcion }) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/puesto/nuevo`,
          { headers, method: 'POST', body: JSON.stringify({ estado: true, descripcion }) })
          .then(fetchHandler)
      }
    },
    modulos: {
      get: async (api) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/modulo/modulos`, { headers })
          .then(fetchHandler)
      },
      add: async (api, { nombre, tipo }) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/modulo/nuevo`,
          { headers, method: 'POST', body: JSON.stringify({ estado: true, nombre, tipo }) })
          .then(fetchHandler)
      },
      delete: async (api, { id }) => {
        const { headers } = getToken(api)
        return await fetch(`${BASE_URL}/rye/modulo/actualizar`,
          { headers, method: 'POST', body: JSON.stringify({ id, estado: false }) })
          .then(fetchHandler)
      }
    }
  }
}
