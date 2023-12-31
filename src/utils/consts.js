/* eslint-disable no-undef */
export const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://localhost:8000' : 'http://localhost:8000'

export const BASE_OFERTA_URL = process.env.NODE_ENV === 'production' ? 'http://localhost:8001' : 'http://localhost:8001'

export const BASE_GEOGRAFIA_URL =
  process.env.NODE_ENV === 'production' ? 'http://localhost:8002' : 'http://localhost:8002'

export const BASE_CENTROS_EDUCATIVOS_URL =
  process.env.NODE_ENV === 'production' ? 'http://localhost:8003' : 'http://localhost:8003'

export const getToken = api => {
  const token = api.getState().auth.token
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  // throw new Error('testing')

  return { headers, token }
}

const order = {
  General: 0,
  Usuarios: 1,
  'Oferta Académica': 2,
  Reportes: 3,
  'Centros Educativos': 4,
  Geográfico: 5
}

export const modulesSorterCallback = (a, b) => {
  if (a.estado || !b.estado) return -1
  if (!a.estado || b.estado) return 1

  const indexA = order[a.modulo]
  const indexB = order[b.modulo]

  // Si ambos elementos están en el objeto de orden, comparar por su posición
  if (indexA !== undefined && indexB !== undefined) {
    return indexA - indexB
  }

  // Si solo uno de ellos está en el objeto de orden, colocar primero al que está
  if (indexA !== undefined) {
    return -1
  }

  if (indexB !== undefined) {
    return 1
  }

  // Si ninguno está en el objeto de orden, mantener el orden actual
  return 0
}

export const sortModules = modules => {
  const newModules = [...modules]
  return newModules.sort(modulesSorterCallback)
}

export const mergeValues = (originalObject, objectToMerge) => {
  const newObj = { ...originalObject }

  Object.entries(objectToMerge).forEach(([key, value]) => {
    if (newObj[key] === undefined) {
      newObj[key] = value
    }
  })

  return newObj
}

export const preventDuplicatesInArray = (array, key) => {
  const keysInArray = {}
  const newArray = []

  array.forEach(el => {
    const value = el[key]
    if (keysInArray[value]) return

    keysInArray[value] = true
    newArray.push(el)
  })

  return newArray
}

export const parseEstado = estado => {
  if (estado === true) return 'Activo'
  if (estado === false) return 'Inactivo'
  return 'Desconocido'
}

export const handleErrorInFormResponse = (response, setError, successFunc) => {
  if (response?.error) {
    const message = response.error?.message ?? 'Ocurrió un error inesperado, si persiste porfavor contacta a soporte.'
    setError('root.fetchError', { type: 'to-not-invalidate', message })
  } else successFunc(response)
}

export const removeIndexFromArray = (index, array) => {
  if (index === -1) return array
  const newArray = [...array]
  newArray.splice(index, 1)
  return newArray
}
