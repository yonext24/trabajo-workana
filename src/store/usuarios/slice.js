import { fakeData } from '@/assets/fake-api-call'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const get_roles_data = createAsyncThunk('usuarios/roles/get_data', async (_, api) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeData({ nombre: 10, descripcion: 20 })
})

const initialState = {
  roles: {
    data: [],
    loading: false,
    revalidating: false,
    error: null
  },
  permisos: {},
  usuarios: {}
}

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(get_roles_data.fulfilled, (state, action) => {
      state.roles.data = action.payload
    })
  }
})

export default usuariosSlice.reducer
// export const {  } = usuariosSlice.actions
