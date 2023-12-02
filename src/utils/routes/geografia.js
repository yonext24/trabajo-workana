import { BASE_GEOGRAFIA_URL } from '../consts'
import { appFetch } from '../fetchHandler'

export const geografia = {
  add: async data => {
    return appFetch(`${BASE_GEOGRAFIA_URL}/rye/pais/archivo`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  get_params: async () => {
    return appFetch(`${BASE_GEOGRAFIA_URL}/rye/pais/paises_departamentos`)
  },
  get_municipios: async ({ page, size, departamento }) => {
    return appFetch(`${BASE_GEOGRAFIA_URL}/rye/pais/municipios?page=${page}&size=${size}&depto=${departamento}`)
  },
  get_parametros: async () => {
    return appFetch(`${BASE_GEOGRAFIA_URL}/rye/pais/param_geografico`)
  }
}
