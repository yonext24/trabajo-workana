import { createSlice } from '@reduxjs/toolkit'
import { addUsuariosExtraReducers } from './thunks'

const initialState = {
  roles: {
    data: [],
    permissionsData: [],
    loading: false,
    revalidating: false,
    error: null
  },
  permisos: {
    data: [],
    filtered: [],
    loading: false,
    revalidating: false,
    error: null
  },
  usuarios: {
    loading: false,
    error: null,
    showing: {}
  }
}

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    set_permisos_filtered: (state, action) => {
      const { data } = action.payload
      state.permisos.filtered = data
    },

    set_usuarios_showing: (state, action) => {
      const { usuario } = action.payload
      state.usuarios.showing = usuario
    }
  },
  extraReducers: builder => {
    addUsuariosExtraReducers(builder)
  }
})

export default usuariosSlice.reducer
export const { set_permisos_filtered, set_usuarios_showing } = usuariosSlice.actions
