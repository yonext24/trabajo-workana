import { fakeData } from '@/assets/fake-api-call'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'

export const get_extension_data = createAsyncThunk('oferta-academica/extension/get', async (_, api) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return [{ ua: 2, codigo: 2, nombre: 7, abreviatura: 5, estado: 1, fecha_de_creacion: '28/8/23' }]
})
export const add_extension = createAsyncThunk('oferta-academica/extension/add', async ({ newData, nombre }, api) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return { id: nombre, newData }
})
export const update_extension = createAsyncThunk('oferta-academica/extension/update', async (_, api) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeData({ ua: 2, codigo: 2, nombre: 7, abreviatura: 5, estado: 1, fecha_de_creacion: new Date().toISOString().split('T')[0] })
})
export const delete_extension = createAsyncThunk('oferta-academica/extension/delete', async ({ nombre }, api) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return nombre
})

const noLoopData = {
  name: 'extension',
  get: {
    function: get_extension_data
  },
  add: {
    function: add_extension
  },
  update: {
    function: update_extension,
    filterBy: 'nombre'
  },
  del: {
    function: delete_extension,
    filterBy: 'nombre'
  }
}

export const setExtensionThunks = (builder) => {
  setThunks({ builder, noLoopData, hasFiltered: true })
}
