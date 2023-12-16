import { centros } from '@/utils/routes'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const get_centros_establecimientos = createAsyncThunk('get-centros-establecimientos', async data => {
  return await centros.get_establecimientos(data)
})
