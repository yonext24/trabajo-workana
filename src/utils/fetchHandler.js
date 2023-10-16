// Este handler se encarga de manejar los errores de las peticiones a la API
// y los lanza como errores de la aplicación.

export const fetchHandler = async (res) => {
  const contentType = res.headers.get('content-type')
  const isJson = contentType && contentType.includes('application/json')

  if (!res.ok) {
    if (isJson) {
      const { detail } = await res.json()
      throw new Error(detail)
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
