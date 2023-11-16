import { fakeData } from '@/assets/fake-api-call'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { carrera } from '@/utils/routes/oferta/carrera'

export const get_carrera_nivel_data = createAsyncThunk('oferta-academica/carrera/nivel/get', async (_, api) => {
  return await carrera.nivel.get(api)
})

export const add_carrera_nivel = createAsyncThunk('oferta-academica/carrera/nivel/add', async (data, api) => {
  return await carrera.nivel.add(api, data)
})

export const update_carrera_nivel = createAsyncThunk('oferta-academica/carrera/nivel/update', async (data, api) => {
  await carrera.nivel.update(api, data)

  return data
})

export const switch_state_carrera_nivel = createAsyncThunk(
  'oferta-academica/carrera/nivel/delete',
  async (data, api) => {
    await carrera.nivel.switch_state(api, data)

    return data
  }
)

/* *********************************************************************************************

                                    CARRERA THUNKS

********************************************************************************************* */

export const get_carrera_carrera_data = createAsyncThunk('oferta-academica/carrera/carrera/get', async (data, api) => {
  return await carrera.carrera.get(api, data)
})

export const add_carrera_carrera = createAsyncThunk('oferta-academica/carrera/carrera/add', async ({ newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return newData
})

export const update_carrera_carrera = createAsyncThunk(
  'oferta-academica/carrera/carrera/update',
  async ({ nombre, newData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    return { id: nombre, newData }
  }
)

export const delete_carrera_carrera = createAsyncThunk(
  'oferta-academica/carrera/carrera/delete',
  async ({ nombre }) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    return nombre
  }
)

/* *********************************************************************************************

                                    TIPO_RECURSO THUNKS

********************************************************************************************* */

export const get_tipo_recurso_data = createAsyncThunk('oferta-academica/carrera/tipo_recurso/get', async (_, api) => {
  return await carrera.tipo_recurso.get(api)
})

export const add_tipo_recurso = createAsyncThunk('oferta-academica/carrera/tipo_recurso/add', async (data, api) => {
  return await carrera.tipo_recurso.add(api, data)
})

export const switch_state_tipo_recurso = createAsyncThunk(
  'oferta-academica/carrera/tipo_recurso/delete',
  async (data, api) => {
    await carrera.tipo_recurso.switch_state(api, data)

    return data
  }
)

export const update_tipo_recurso = createAsyncThunk(
  'oferta-academica/carrera/tipo_recurso/update',
  async (data, api) => {
    await carrera.tipo_recurso.update(api, data)

    return data
  }
)
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

export const update_recurso = createAsyncThunk(
  'oferta-academica/carrera/recurso/update',
  async ({ nombre, newData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    return { id: nombre, newData }
  }
)

const toLoop = [
  {
    carrera: {
      get: {
        function: get_carrera_carrera_data,
        customFunc: ({ state, data, getProperty, setProperty }) => {
          const { items, pages } = data

          const paginationData = getProperty({ property: 'paginationData', state })

          setProperty({ property: 'data', value: items, state })
          setProperty({
            property: 'paginationData',
            state,
            value: {
              ...paginationData,
              pages
            }
          })
        }
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
        filterBy: 'id_tipo_recurso'
      },
      switch_state: {
        function: switch_state_tipo_recurso,
        filterBy: 'id_tipo_recurso'
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
        filterBy: 'id_nivel'
      },
      switch_state: {
        function: switch_state_carrera_nivel,
        filterBy: 'id_nivel'
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
