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
export const delete_unidad_academica_tipos = createAsyncThunk(
  'oferta-academica/unidad-academica/tipos/delete',
  async (data, api) => {
    await unidad.tipo.delete(api, data)

    return data.id_tipo_ua
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
    await new Promise(resolve => setTimeout(resolve, 1500))

    const data = [
      {
        tipo: 'Escuela',
        codigo: 1,
        nombre: 'Escuela de Ingeniería',
        abreviatura: 'EISI',
        id_unidad: 0
      }
    ]

    return data
  }
)
export const add_unidad_academica_unidad = createAsyncThunk(
  'oferta-academica/unidad-academica/unidad/add',
  async ({ newData }, api) => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return newData
  }
)
export const delete_unidad_academica_unidad = createAsyncThunk(
  'oferta-academica/unidad-academica/unidad/delete',
  async ({ nombre }, api) => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return nombre
  }
)
export const update_unidad_academica_unidad = createAsyncThunk(
  'oferta-academica/unidad-academica/unidad/update',
  async ({ nombre, newData }, api) => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return { id: nombre, newData }
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

            state.unidadAcademica.tipo.data =
              state.unidadAcademica.tipo.data.map(unidad => {
                if (unidad.id_tipo_ua === id_tipo_ua) {
                  unidad.descripcion = descripcion
                }

                return unidad
              })
          }
        },
        del: {
          function: delete_unidad_academica_tipos,
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
          function: update_unidad_academica_unidad
        },
        del: {
          function: delete_unidad_academica_unidad,
          filterBy: 'id_tipo_ua'
        },
        hasFiltered: true
      }
    }
  ]

  setThunks({ builder, toLoop, placeName: 'unidadAcademica' })
}
