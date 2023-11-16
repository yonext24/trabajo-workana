// Este handler se encarga de manejar los errores de las peticiones a la API
// y los lanza como errores de la aplicación.

import { BASE_URL } from './consts'

let store

export const injectStore = _store => {
  store = _store
}

const errorParser = {
  'Not authenticated':
    'No pudimos verificar tu sesión, porfavor vuelve a iniciar sesión. Si el problema persiste, contacta a soporte.',
  'Unprocessable Entity': 'Hubo un error validando los datos, si el problema persiste porfavor contacta a soporte.',
  'Not Found': 'Ocurrió un error inesperado, si el problema persiste porfavor contacta a soporte (NotFound).',
  'Failed to fetch':
    'No pudimos conectarnos al servidor, porfavor intentalo denuevo. Si el problema persiste contacta con soporte.'
}

export const fetchHandler = async res => {
  const contentType = res.headers.get('content-type')
  const isJson = contentType && contentType.includes('application/json')

  if (res.status === 422) {
    // Fastapi utiliza siempre el 422 para los error de validación
    throw new Error(errorParser['Unprocessable Entity'])
  }

  if (!res.ok) {
    if (isJson) {
      const { detail } = await res.json()
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
    const state = store.getState()
    const token = state?.auth?.token

    if (!token) throw new Error('No se encontró el token de autenticación, porfavor inicia sesión.')

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
      const service = url.startsWith(BASE_URL) ? 'Autenticación' : 'Oferta Académica'

      throw new Error(
        `Ocurrió un error, es posible que el servidor de ${service} esté caído, porfavor contacta a soporte.`
      )
    }

    throw err
  }
}
