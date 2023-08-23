import { fakeData } from '@/assets/fake-api-call'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const get_unidad_academica_tipos = createAsyncThunk('oferta-academica/unidad-academica/tipo/get', async (_, api) => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  return fakeData({ nombre: 8, descripcion: 12 })
})
export const add_unidad_academica_tipos = createAsyncThunk('oferta-academica/unidad-academica/tipo/add', async ({ newData }, api) => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  return newData
})
export const delete_unidad_academica_tipos = createAsyncThunk('oferta-academica/unidad-academica/tipos/delete', async ({ nombre }, api) => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  return nombre
})
export const update_unidad_academica_tipos = createAsyncThunk('oferta-academica/unidad-academica/tipos/update', async ({ nombre, newData }, api) => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  return { nombre, newData }
})

/*
  *****************************************************************************************

                                      UNIDADES THUNKS

  *****************************************************************************************
*/

export const get_unidad_academica_unidad = createAsyncThunk('oferta-academica/unidad-academica/unidad/get', async (_, api) => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  const data = fakeData({ tipo: 6, codigo: 1, nombre: 12, abreviatura: 5 })

  return data.map(el => {
    return { ...el, codigo: Math.floor(Math.random() * 100), tipo: ['Escuela', 'Test'][Math.floor(Math.random() * 2)] }
  })
})
export const add_unidad_academica_unidad = createAsyncThunk('oferta-academica/unidad-academica/unidad/add', async ({ newData }, api) => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  return newData
})
export const delete_unidad_academica_unidad = createAsyncThunk('oferta-academica/unidad-academica/unidad/delete', async ({ nombre }, api) => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  return nombre
})
export const update_unidad_academica_unidad = createAsyncThunk('oferta-academica/unidad-academica/unidad/update', async ({ nombre, newData }, api) => {
  await new Promise(resolve => setTimeout(resolve, 1500))

  return { nombre, newData }
})

export const setUnidadAcademicaExtraReducers = builder => {
  builder.addCase(get_unidad_academica_tipos.fulfilled, (state, action) => {
    const data = action.payload
    state.unidadAcademica.tipo.data = data
    state.unidadAcademica.tipo.loading = false
    state.unidadAcademica.tipo.revalidate = false
    state.unidadAcademica.tipo.error = null
  })
  builder.addCase(add_unidad_academica_tipos.fulfilled, (state, action) => {
    const data = action.payload
    state.unidadAcademica.tipo.data.push(data)
    state.unidadAcademica.tipo.loading = false
    state.unidadAcademica.tipo.error = null
  })
  builder.addCase(delete_unidad_academica_tipos.fulfilled, (state, action) => {
    const nombre = action.payload
    state.unidadAcademica.tipo.data = state.unidadAcademica.tipo.data.filter(el => el.nombre !== nombre)
    state.unidadAcademica.tipo.loading = false
    state.unidadAcademica.tipo.revalidate = false
    state.unidadAcademica.tipo.error = null
  })
  builder.addCase(update_unidad_academica_tipos.fulfilled, (state, action) => {
    const { newData, nombre } = action.payload
    state.unidadAcademica.tipo.data = state.unidadAcademica.tipo.data.map(el => {
      if (el.nombre === nombre) return newData
      return el
    })
    state.unidadAcademica.tipo.loading = false
    state.unidadAcademica.tipo.revalidate = false
    state.unidadAcademica.tipo.error = null
  })
  builder.addCase(get_unidad_academica_unidad.fulfilled, (state, action) => {
    const data = action.payload
    state.unidadAcademica.unidad.data = data

    state.unidadAcademica.unidad.filtered = data
    state.unidadAcademica.unidad.loading = false
    state.unidadAcademica.unidad.revalidate = false
    state.unidadAcademica.unidad.error = null
  })
  builder.addCase(add_unidad_academica_unidad.fulfilled, (state, action) => {
    const data = action.payload
    state.unidadAcademica.unidad.data.push(data)
    state.unidadAcademica.unidad.loading = false
    state.unidadAcademica.unidad.error = null
  })
  builder.addCase(delete_unidad_academica_unidad.fulfilled, (state, action) => {
    const nombre = action.payload
    state.unidadAcademica.unidad.data = state.unidadAcademica.unidad.data.filter(el => el.nombre !== nombre)
    state.unidadAcademica.unidad.loading = false
    state.unidadAcademica.unidad.revalidate = false
    state.unidadAcademica.unidad.error = null
  })
  builder.addCase(update_unidad_academica_unidad.fulfilled, (state, action) => {
    const { newData, nombre } = action.payload
    state.unidadAcademica.unidad.data = state.unidadAcademica.unidad.data.map(el => {
      if (el.nombre === nombre) return newData
      return el
    })
    state.unidadAcademica.unidad.loading = false
    state.unidadAcademica.unidad.revalidate = false
    state.unidadAcademica.unidad.error = null
  })
}
