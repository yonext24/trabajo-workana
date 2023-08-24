import { fakeData } from '@/assets/fake-api-call'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const get_extension_data = createAsyncThunk('oferta-academica/extension/get', async (_, api) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeData({ ua: 2, codigo: 2, nombre: 7, abreviatura: 5, estado: 1, fecha_de_creacion: new Date().toISOString().split('T')[0] })
})
export const add_extension = createAsyncThunk('oferta-academica/extension/add', async ({ newData }, api) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return newData
})

export const setExtensionThunks = (builder) => {
  builder.addCase(get_extension_data.fulfilled, (state, action) => {
    const data = action.payload
    state.extension.data = data
    state.extension.filtered = data
    state.extension.loading = false
    state.extension.revalidate = false
    state.extension.error = null
  })
  builder.addCase(add_extension.fulfilled, (state, action) => {
    const data = action.payload
    state.extension.data.push(data)
    state.extension.loading = false
    state.extension.revalidate = false
    state.extension.error = null
  })
}
