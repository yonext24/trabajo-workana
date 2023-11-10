import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { unidad } from '@/utils/routes'

export const get_unidad_academica_tipos = createAsyncThunk(
  'oferta-academica/unidad-academica/tipo/get',
  async (_, api) => {
    return await unidad.tipo.get(api)
  }
)
export const add_unidad_academica_tipos = createAsyncThunk(
  'oferta-academica/unidad-academica/tipo/add',
  async (data, api) => {
    return await unidad.tipo.add(api, data)
  }
)
export const switch_state_unidad_academica_tipos = createAsyncThunk(
  'oferta-academica/unidad-academica/tipos/delete',
  async (data, api) => {
    await unidad.tipo.switch_state(api, data)

    return data
  }
)
export const update_unidad_academica_tipos = createAsyncThunk(
  'oferta-academica/unidad-academica/tipos/update',
  async (data, api) => {
    await unidad.tipo.update(api, data)

    return data
  }
)

/*
  *****************************************************************************************

                                      UNIDADES THUNKS

  *****************************************************************************************
*/

export const get_unidad_academica_unidad = createAsyncThunk(
  'oferta-academica/unidad-academica/unidad/get',
  async (_, api) => {
    return await unidad.unidad.get(api)
  }
)
export const add_unidad_academica_unidad = createAsyncThunk(
  'oferta-academica/unidad-academica/unidad/add',
  async (data, api) => {
    const res = await unidad.unidad.add(api, data)
    return { ...res, tipo_ua: data.tipo_ua }
  }
)
export const switch_state_unidad_academica_unidad = createAsyncThunk(
  'oferta-academica/unidad-academica/unidad/delete',
  async (data, api) => {
    await unidad.unidad.switch_state(api, data)
    return data
  }
)
export const update_unidad_academica_unidad = createAsyncThunk(
  'oferta-academica/unidad-academica/unidad/update',
  async (data, api) => {
    await unidad.unidad.update(api, data)
    return data
  }
)

export const setUnidadAcademicaExtraReducers = builder => {
  const toLoop = [
    {
      tipo: {
        get: {
          function: get_unidad_academica_tipos
        },
        add: {
          function: add_unidad_academica_tipos
        },
        update: {
          function: update_unidad_academica_tipos,
          customFunc: ({ state, data }) => {
            const { id_tipo_ua, descripcion } = data

            state.unidadAcademica.tipo.data = state.unidadAcademica.tipo.data.map(unidad => {
              if (unidad.id_tipo_ua === id_tipo_ua) {
                unidad.descripcion = descripcion
              }

              return unidad
            })
          }
        },
        switch_state: {
          function: switch_state_unidad_academica_tipos,
          filterBy: 'id_tipo_ua'
        },
        hasFiltered: true
      }
    },
    {
      unidad: {
        get: {
          function: get_unidad_academica_unidad
        },
        add: {
          function: add_unidad_academica_unidad
        },
        update: {
          function: update_unidad_academica_unidad,
          customFunc: ({ state, data }) => {
            state.unidadAcademica.unidad.data = state.unidadAcademica.unidad.data.map(unidad => {
              if (unidad.id_unidad === data.id_unidad) {
                return { ...unidad, ...data }
              }
              return unidad
            })
          }
        },
        switch_state: {
          function: switch_state_unidad_academica_unidad,
          filterBy: 'id_unidad'
        },
        hasFiltered: true
      }
    }
  ]

  setThunks({ builder, toLoop, placeName: 'unidadAcademica' })
}
