import { fakeData } from '@/assets/fake-api-call'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const get_carrera_nivel_data = createAsyncThunk('oferta-academica/carrera/nivel/get', async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeData({ nombre: 8, descripcion: 15 })
})

export const add_carrera_nivel = createAsyncThunk('oferta-academica/carrera/nivel/add', async ({ newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return newData
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

export const delete_carrera_carrera = createAsyncThunk('oferta-academica/carrera/carrera/delete', async ({ nombre }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return nombre
})

export const setCarreraThunks = builder => {
  builder.addCase(get_carrera_nivel_data.fulfilled, (state, action) => {
    const data = action.payload
    state.carrera.nivel.data = data
    state.carrera.nivel.loading = false
    state.carrera.nivel.revalidating = false
    state.carrera.nivel.error = null
  })
  builder.addCase(add_carrera_nivel.fulfilled, (state, action) => {
    const data = action.payload
    state.carrera.nivel.data.push(data)
    state.carrera.nivel.loading = false
    state.carrera.nivel.revalidating = false
    state.carrera.nivel.error = null
  })
  builder.addCase(delete_carrera_nivel.fulfilled, (state, action) => {
    const nombre = action.payload
    state.carrera.nivel.data = state.carrera.nivel.data.filter(el => el.nombre !== nombre)
    state.carrera.nivel.loading = false
    state.carrera.nivel.revalidating = false
    state.carrera.nivel.error = null
  })
  builder.addCase(get_carrera_carrera_data.fulfilled, (state, action) => {
    const data = action.payload
    state.carrera.carrera.data = data
    state.carrera.carrera.filtered = data
    state.carrera.carrera.loading = false
    state.carrera.carrera.revalidating = false
    state.carrera.carrera.error = null
  })
  builder.addCase(add_carrera_carrera.fulfilled, (state, action) => {
    const data = action.payload
    state.carrera.carrera.data.push(data)
    state.carrera.carrera.loading = false
    state.carrera.carrera.revalidating = false
    state.carrera.carrera.error = null
  })
  builder.addCase(delete_carrera_carrera.fulfilled, (state, action) => {
    const nombre = action.payload
    state.carrera.carrera.data = state.carrera.carrera.data.filter(el => el.nombre !== nombre)
    state.carrera.carrera.loading = false
    state.carrera.carrera.revalidating = false
    state.carrera.carrera.error = null
  })
}
