import { BASE_URL, getToken } from '@/utils/consts'
import { fetchHandler } from '../fetchHandler'

export const auth = {
  login: `${BASE_URL}/rye/usuario/token`,
  perfil: `${BASE_URL}/rye/usuario/perfil`,
  changePassword: async (api, data) => {
    const { headers } = getToken(api)
    return await fetch(`${BASE_URL}/rye/usuario/actualizar_contrasenia`, {
      headers,
      method: 'POST',
      body: JSON.stringify(data)
    }).then(fetchHandler)
  },
  permisos: `${BASE_URL}/rye/permiso/permisos_usuario`,
  parametros: `${BASE_URL}/rye/modulo/parametros`
}
