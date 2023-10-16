import { fetchHandler } from '@/utils/fetchHandler'
import { routes } from '@/utils/routes'
import { createAsyncThunk } from '@reduxjs/toolkit'

const permissionParser = ({ userPermissions, modulos }) => {
  return userPermissions.map(permission => {
    const nombre = modulos.find(modulo => modulo.codigo === permission.modulo).modulo

    return {
      ...permission,
      nombre
    }
  })
}

const getUserData = async ({ headers }) => {
  const user = await fetch(routes.auth.perfil, {
    headers
  }).then(fetchHandler)

  const userPermissions = await fetch(routes.permisos.permisos, {
    headers
  }).then(fetchHandler)

  const { modulos, operacion } = await fetch(routes.permisos.parametros, {
    headers
  }).then(fetchHandler)

  const parsedPermissions = permissionParser({ userPermissions, modulos })

  return { user, permissions: parsedPermissions, operacion }
}

// Acción asincrónica para verificar la sesión inicial
export const checkSession = createAsyncThunk(routes.auth.login, async () => {
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
    const errMessage = err instanceof Error ? err.message : 'Ocurrió un error inesperado, porfavor contacta a soporte. (From not expected catch)'
    throw new Error(errMessage)
  }
})

export const login = createAsyncThunk('auth/login', async ({ formData }, api) => {
  try {
    const { access_token: token } = await fetch(routes.auth.login, {
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
    const errMessage = err instanceof Error ? err.message : 'Ocurrió un error inesperado, porfavor contacta a soporte. (From not expected catch)'
    throw new Error(errMessage)
  }
})
