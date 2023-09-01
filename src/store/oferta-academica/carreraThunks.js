import { fakeData } from '@/assets/fake-api-call'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'

export const get_carrera_nivel_data = createAsyncThunk('oferta-academica/carrera/nivel/get', async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeData({ nombre: 8, descripcion: 15 })
})

export const add_carrera_nivel = createAsyncThunk('oferta-academica/carrera/nivel/add', async ({ newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return newData
})

export const update_carrera_nivel = createAsyncThunk('oferta-academica/carrera/nivel/update', async ({ nombre, newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return { id: nombre, newData }
})

export const delete_carrera_nivel = createAsyncThunk('oferta-academica/carrera/nivel/delete', async ({ nombre }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return nombre
})

/* *********************************************************************************************

                                    CARRERA THUNKS

********************************************************************************************* */

export const get_carrera_carrera_data = createAsyncThunk('oferta-academica/carrera/carrera/get', async (_, api) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeData({ nivel: 8, carrera: 10, estado: 4 })
})

export const add_carrera_carrera = createAsyncThunk('oferta-academica/carrera/carrera/add', async ({ newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return newData
})

export const update_carrera_carrera = createAsyncThunk('oferta-academica/carrera/carrera/update', async ({ nombre, newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return { id: nombre, newData }
})

export const delete_carrera_carrera = createAsyncThunk('oferta-academica/carrera/carrera/delete', async ({ nombre }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return nombre
})

/* *********************************************************************************************

                                    TIPO_RECURSO THUNKS

********************************************************************************************* */

export const get_tipo_recurso_data = createAsyncThunk('oferta-academica/carrera/tipo_recurso/get', async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeData({ nombre: 8, descripcion: 15 })
})

export const add_tipo_recurso = createAsyncThunk('oferta-academica/carrera/tipo_recurso/add', async ({ newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return newData
})

export const delete_tipo_recurso = createAsyncThunk('oferta-academica/carrera/tipo_recurso/delete', async ({ nombre }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return nombre
})

export const update_tipo_recurso = createAsyncThunk('oferta-academica/carrera/tipo_recurso/update', async ({ nombre, newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return { id: nombre, newData }
})
/* *********************************************************************************************

                                    RECURSO THUNKS

********************************************************************************************* */

export const get_recurso_data = createAsyncThunk('oferta-academica/carrera/recurso/get', async () => {
  await new Promise(resolve => setTimeout(resolve, 200))

  return fakeData({ nombre: 8, descripcion: 15, tipo: 8 })
})

export const add_recurso = createAsyncThunk('oferta-academica/carrera/recurso/add', async ({ newData }) => {
  await new Promise(resolve => setTimeout(resolve, 200))

  return newData
})

export const delete_recurso = createAsyncThunk('oferta-academica/carrera/recurso/delete', async ({ nombre }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return nombre
})

export const update_recurso = createAsyncThunk('oferta-academica/carrera/recurso/update', async ({ nombre, newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return { id: nombre, newData }
})

const toLoop = [
  {
    carrera: {
      get: {
        function: get_carrera_carrera_data
      },
      add: {
        function: add_carrera_carrera
      },
      update: {
        function: update_carrera_carrera,
        filterBy: 'nombre'
      },
      del: {
        function: delete_carrera_carrera,
        filterBy: 'nombre'
      }
    }
  },
  {
    tipo_recurso: {
      get: {
        function: get_tipo_recurso_data
      },
      add: {
        function: add_tipo_recurso
      },
      update: {
        function: update_tipo_recurso,
        filterBy: 'nombre'
      },
      del: {
        function: delete_tipo_recurso,
        filterBy: 'nombre'
      }
    }
  },
  {
    nivel: {
      get: {
        function: get_carrera_nivel_data
      },
      add: {
        function: add_carrera_nivel
      },
      update: {
        function: update_carrera_nivel,
        filterBy: 'nombre'
      },
      del: {
        function: delete_carrera_nivel,
        filterBy: 'nombre'
      }

    }
  },
  {
    recurso: {
      get: {
        function: get_recurso_data
      },
      add: {
        function: add_recurso
      },
      update: {
        function: update_recurso,
        filterBy: 'nombre'
      },
      del: {
        function: delete_recurso,
        filterBy: 'nombre'
      },
      hasFiltered: true
    }
  }
]

export const setCarreraThunks = builder => {
  setThunks({ builder, toLoop, placeName: 'carrera' })
}
