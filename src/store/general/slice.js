import { createSlice } from '@reduxjs/toolkit'
import { setSectoresThunks } from './sectoresThunks'
import { setDependenciasThunks } from './dependenciasThunks'
import { setPuestosThunks } from './puestosThunks'
import { setModulosThunks } from './modulosThunks'

const initialState = {
  sectores: {
    loading: false,
    revalidating: false,
    error: null,
    data: []
  },
  dependencias: {
    loading: false,
    revalidating: false,
    error: null,
    data: [],
    filtered: []
  },
  puestos: {
    loading: false,
    revalidating: false,
    error: null,
    data: []
  },
  modulos: {
    loading: false,
    revalidating: false,
    error: null,
    data: []
  }
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {

    set_general_dependencias_filtered: (state, action) => {
      const { filteredData } = action.payload
      state.dependencias.filtered = filteredData
    }

  },
  extraReducers: (builder) => {
    setSectoresThunks(builder)
    setDependenciasThunks(builder)
    setPuestosThunks(builder)
    setModulosThunks(builder)
  }
})

export default dataSlice.reducer
export const {
  set_general_dependencias_filtered

} = dataSlice.actions
