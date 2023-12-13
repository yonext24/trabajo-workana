// Este handler se encarga de manejar los errores de las peticiones a la API
// y los lanza como errores de la aplicación.

import { history } from '@/App'
import { BASE_GEOGRAFIA_URL, BASE_OFERTA_URL, BASE_URL } from './consts'
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

export const fetchHandler = async res => {
  const contentType = res.headers.get('content-type')
  const isJson = contentType && contentType.includes('application/json')

  if (res.status === 401) {
    if (res.url !== `${BASE_URL}/rye/usuario/token`) {
      history.replace('/login?expired=true')
      store.dispatch(close_all_modals())
      await new Promise(res => setTimeout(res, 150)) // Esto es porque aveces se ejecuta el logout antes de que se redireccione a expired=true
      store.dispatch(logout())
      throw new Error('No pudimos verificar tu sesión, porfavor vuelve a iniciar sesión.')
    }
  }
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
    const state = store?.getState()
    const token = state?.auth?.token

    if (!token) {
      console.log(state, token)
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
      throw new Error(
        `Ocurrió un error, es posible que el servidor de ${matchService(url)} esté caído, porfavor contacta a soporte.`
      )
    }

    throw err
  }
}

const matchService = url => {
  if (url.startsWith(BASE_URL)) return 'Autenticación'
  if (url.startsWith(BASE_OFERTA_URL)) return 'Oferta Académica'
  if (url.startsWith(BASE_GEOGRAFIA_URL)) return 'Geografía'
  return ''
}
