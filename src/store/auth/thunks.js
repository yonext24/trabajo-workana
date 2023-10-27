import { fetchHandler } from '@/utils/fetchHandler'
import { auth } from '@/utils/routes'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const INITIAL_PERMISSIONS_STATE = {
  READ: false,
  CREATE: false,
  UPDATE: false,
  DELETE: false
}

const nombreModulosMapper = {
  General: 'GENERAL',
  Usuarios: 'USUARIOS',
  'Oferta Académica': 'OFERTA_ACADEMICA',
  Reportes: 'REPORTES',
  'Centros Educativos': 'CENTROS_EDUCATIVOS',
  Geográfico: 'GEOGRAFICO'
}
const operacionesMapper = {
  Leer: 'READ',
  Crear: 'CREATE',
  Actualizar: 'UPDATE',
  Eliminar: 'DELETE'
} // Esto está hecho así porque se le cambiaron el nombre a las operaciones y de los módulos después de que ya hardcodee muchas cosas

const permissionParser = ({ userPermissions, modulos, operaciones }) => {
  // Se fusionan los permisos de la api con los parámetros para agregar el nombre de los módulos
  const rawPermissions = userPermissions.map(permission => {
    const rawNombre = modulos.find(
      modulo => modulo.codigo === permission.id_modulo
    ).nombre
    const nombre = nombreModulosMapper[rawNombre] ?? rawNombre

    return {
      ...permission,
      nombre
    }
  })

  const finalPermissions = {}

  modulos.forEach(modulo => {
    const nombreModulo = nombreModulosMapper[modulo.nombre] ?? modulo.nombre
    finalPermissions[nombreModulo] = INITIAL_PERMISSIONS_STATE
  })

  modulos.forEach(modulo => {
    const nombreModulo = nombreModulosMapper[modulo.nombre] ?? modulo.nombre
    const permissionsOfModule = rawPermissions.filter(
      permission => permission.nombre === nombreModulo
    )
    const parsedPermissionsOfModule = {}

    // El formato de las operaciones que entrega la api esta en minúscula, por lo que se mapea a mayúscula
    // para que coincida con el formato de las constantes
    operaciones.forEach(operacion => {
      const currentOperation =
        operacionesMapper[operacion.nombre] ?? operacion.nombre
      const userHasCurrentPermission = permissionsOfModule.some(
        permission => permission.id_operacion === operacion.codigo
      )

      parsedPermissionsOfModule[currentOperation] = userHasCurrentPermission
    })

    finalPermissions[nombreModulo] = parsedPermissionsOfModule
  })

  return finalPermissions
}

const getUserData = async ({ headers }) => {
  const user = await fetch(auth.perfil, {
    headers
  }).then(fetchHandler)

  const userPermissions = await fetch(auth.permisos, {
    headers
  }).then(fetchHandler)

  const { modulos, operaciones } = await fetch(auth.parametros, {
    headers
  }).then(fetchHandler)

  const parsedPermissions = permissionParser({
    userPermissions,
    modulos,
    operaciones
  })

  return { user, permissions: parsedPermissions, operacion: operaciones }
}

// Acción asincrónica para verificar la sesión inicial
export const checkSession = createAsyncThunk(auth.login, async () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const headers = {
      Authorization: `Bearer ${token}`
    }

    const { user, permissions, operacion } = await getUserData({ headers })

    return {
      token,
      user,
      permissions,
      operacion
    }
  } catch (err) {
    localStorage.removeItem('token')
    const errMessage =
      err instanceof Error
        ? err.message
        : 'Ocurrió un error inesperado, porfavor contacta a soporte. (From not expected catch)'
    throw new Error(errMessage)
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async ({ formData }, api) => {
    console.log(auth)

    try {
      const { access_token: token } = await fetch(auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
        body: formData.toString()
      }).then(fetchHandler)

      const headers = {
        Authorization: `Bearer ${token}`
      }

      const { user, permissions, operacion } = await getUserData({ headers })

      localStorage.setItem('token', token)

      return {
        token,
        user,
        permissions,
        operacion
      }
    } catch (err) {
      const errMessage =
        err instanceof Error
          ? err.message
          : 'Ocurrió un error inesperado, porfavor contacta a soporte. (From not expected catch)'
      throw new Error(errMessage)
    }
  }
)

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data, api) => {
    return await auth.changePassword(api, data)
  }
)
