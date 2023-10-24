// Este handler se encarga de manejar los errores de las peticiones a la API
// y los lanza como errores de la aplicación.

const errorParser = {
  'Not authenticated': 'No pudimos verificar tu sesión, porfavor vuelve a iniciar sesión. Si el problema persiste, contacta a soporte.',
  'Unprocessable Entity': 'Hubo un error validando los datos, si el problema persiste porfavor contacta a soporte.',
  'Not Found': 'Ocurrió un error inesperado, si el problema persiste porfavor contacta a soporte (NotFound).'
}

export const fetchHandler = async (res) => {
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

  return res
}
