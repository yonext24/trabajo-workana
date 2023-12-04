import { BASE_URL } from '@/utils/consts'
import { appFetch } from '../fetchHandler'

export const auth = {
  login: `${BASE_URL}/rye/usuario/token`,
  perfil: `${BASE_URL}/rye/usuario/perfil`,
  changePassword: async data => {
    return await appFetch(`${BASE_URL}/rye/usuario/actualizar_contrasenia`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  recoverPassword: async data => {
    return await appFetch(`${BASE_URL}/rye/usuario/recuperar_contrasenia`, {
      withoutToken: true,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  permisos: `${BASE_URL}/rye/permiso/permisos_usuario`,
  parametros: `${BASE_URL}/rye/modulo/parametros`,
  actualzar_perfil: async data =>
    await appFetch(`${BASE_URL}/rye/usuario/actualizar_perfil`, { body: JSON.stringify(data), method: 'POST' })
}
