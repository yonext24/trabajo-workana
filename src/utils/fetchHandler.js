// Este handler se encarga de manejar los errores de las peticiones a la API
// y los lanza como errores de la aplicación.

import { history } from '@/App'
import { BASE_URL } from './consts'
import { close_all_modals } from '@/store/layout/slice'
import { logout } from '@/store/auth/slice'

const errorParser = {
  'Not authenticated':
    'No pudimos verificar tu sesión, porfavor vuelve a iniciar sesión. Si el problema persiste, contacta a soporte.',
  'Unprocessable Entity':
    'Hubo un error validando los datos del formulario, si el problema persiste porfavor contacta a soporte.',
  'Not Found': 'Ocurrió un error inesperado, si el problema persiste porfavor contacta a soporte (NotFound).',
  'Failed to fetch':
    'No pudimos conectarnos al servidor, porfavor intentalo denuevo. Si el problema persiste contacta con soporte.'
}

let store

export const injectStore = _store => {
  store = _store
}

const validationErrorParser = errors => {
  let parsedErrors = ''

  for (let i = 0; i < errors.length; i++) {
    const currentError = errors[i]
    const msg = currentError?.msg
    if (!msg) continue

    parsedErrors += `\n${i + 1}: ${msg}`
  }
  return parsedErrors
}

export const fetchHandler = async res => {
  const contentType = res.headers.get('content-type')
  const isJson = contentType && contentType.includes('application/json')

  if (res.status === 401) {
    if (res.url !== `${BASE_URL}/rye/usuario/token`) {
      history.replace('/login?expired=true')
      store.dispatch(close_all_modals())

      // Esto es porque aveces se ejecuta el logout antes de que se redireccione a expired=true
      await new Promise(res => setTimeout(res, 250))

      store.dispatch(logout())
      throw new Error('No pudimos verificar tu sesión, porfavor vuelve a iniciar sesión.')
    }
  }
  if (res.status === 422) {
    // Fastapi utiliza siempre el 422 para los error de validación
    // dejo pasar el error para ver si puedo imprimir algun error más específico en lo formularios
  }

  if (!res.ok) {
    if (isJson) {
      const { detail } = await res.json()

      if (res.status === 422) {
        const parsedError = validationErrorParser(detail)
        throw new Error(parsedError)
      }

      const parsedError = errorParser[detail] ?? detail
      throw new Error(parsedError)
    } else {
      throw new Error('Ocurrió un error inesperado, porfavor contacta a soporte. (from fHandler)')
    }
  }

  if (isJson) {
    const data = await res.json()
    return data
  }
}

export const appFetch = async (url, options) => {
  const withoutToken = options?.withoutToken
  const externalToken = options?.externalToken

  let headers = {}

  if (!withoutToken && !externalToken) {
    const state = store?.getState()
    const token = state?.auth?.token

    if (!token) {
      throw new Error(
        'Ocurrió un error, no pudimos encontrar tu sesión, porfavor reinicia la página. Si el problema persiste contacta a soporte.'
      )
    }

    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  if (externalToken) {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${externalToken}`
    }
  }

  const config = {
    ...options,
    headers: {
      ...headers,
      ...options?.headers
    }
  }

  try {
    const res = await fetch(url, config).then(fetchHandler)
    return res
  } catch (err) {
    if (err.message === 'Failed to fetch') {
      throw new Error(`Ocurrió un error, es posible que el servidor esté de baja, por favor contacte a soporte.`)
    }

    throw err
  }
}
