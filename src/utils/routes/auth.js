import { BASE_URL } from '@/utils/consts'
import { appFetch } from '../fetchHandler'

export const auth = {
  login: `${BASE_URL}/rye/usuario/token`,
  perfil: `${BASE_URL}/rye/usuario/perfil`,
  changePassword: async (api, data) => {
    return await appFetch(`${BASE_URL}/rye/usuario/actualizar_contrasenia`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  recoverPassword: async (api, data) => {
    return await appFetch(`${BASE_URL}/rye/usuario/recuperar_contrasenia`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  permisos: `${BASE_URL}/rye/permiso/permisos_usuario`,
  parametros: `${BASE_URL}/rye/modulo/parametros`
}
