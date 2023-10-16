const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'

export const routes = {
  auth: {
    login: `${BASE_URL}/rye/usuario/token`,
    perfil: `${BASE_URL}/rye/usuario/perfil`
  },
  permisos: {
    permisos: `${BASE_URL}/rye/permiso/permisos`,
    parametros: `${BASE_URL}/rye/permiso/parametros`
  }
}
