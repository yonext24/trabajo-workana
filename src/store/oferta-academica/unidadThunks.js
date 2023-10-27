import { fakeData } from '@/assets/fake-api-call'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'

export const get_unidad_academica_tipos = createAsyncThunk(
  'oferta-academica/unidad-academica/tipo/get',
  async (_, api) => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return fakeData({ nombre: 8, descripcion: 12 })
  }
)
export const add_unidad_academica_tipos = createAsyncThunk(
  'oferta-academica/unidad-academica/tipo/add',
  async ({ newData }, api) => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return newData
  }
)
export const delete_unidad_academica_tipos = createAsyncThunk(
  'oferta-academica/unidad-academica/tipos/delete',
  async ({ nombre }, api) => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return nombre
  }
)
export const update_unidad_academica_tipos = createAsyncThunk(
  'oferta-academica/unidad-academica/tipos/update',
  async ({ nombre, newData }, api) => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    return { id: nombre, newData }
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
          filterBy: 'nombre'
        },
        del: {
          function: delete_unidad_academica_tipos,
          filterBy: 'nombre'
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
          filterBy: 'nombre'
        },
        del: {
          function: delete_unidad_academica_unidad,
          filterBy: 'nombre'
        },
        hasFiltered: true
      }
    }
  ]

  setThunks({ builder, toLoop, placeName: 'unidadAcademica' })
}
