import { fakeData } from '@/assets/fake-api-call'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const get_extension_data = createAsyncThunk('oferta-academica/extension/get', async (_, api) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeData({ ua: 2, codigo: 2, nombre: 7, estado: 1 })
})

export const setExtensionThunks = (builder) => {

}
