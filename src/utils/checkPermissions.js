// Esta es la función que se encarga de verificar si un usuario tiene ciertos permisos
// para realizar una operación en un módulo específico.

// operacion: "read" | "create" | "delete"
// permissions: Array<{ modulo: string, operacion: string, nombre: string }>

// permissions es la lista de permisos del usuario ya parseada, con el nombre ya sacado de /parametros

export const checkPermissions = ({ operacion, permissions, nameOfModule }) => {
  if (!permissions || !operacion) return false
  const PERMISOS = permissions.filter(el => el.nombre === nameOfModule)

  if (PERMISOS.some(el => el.operacion === operacion)) {
    return true
  }

  return false
}
