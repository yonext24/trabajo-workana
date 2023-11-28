import { geografia } from '@/utils/routes'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const get_geografia_params = createAsyncThunk('get-geo-params', async () => {
  return await geografia.get_params()
})

export const get_geografia_municipios = createAsyncThunk('get-geo-municipios', async data => {
  return await geografia.get_municipios(data)
})
