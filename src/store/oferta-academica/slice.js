import { createSlice } from '@reduxjs/toolkit'
import { setUnidadAcademicaExtraReducers } from './unidadThunks'
import { setExtensionThunks } from './extensionThunks'

const initialState = {
  unidadAcademica: {
    tipo: {
      loading: false,
      revalidate: false,
      data: [],
      error: null
    },
    unidad: {
      loading: false,
      revalidate: false,
      data: [],
      filtered: [],
      error: null
    }
  },
  extension: {
    loading: false,
    revalidate: false,
    data: [],
    filtered: [],
    error: null
  }
}

export const ofertaAcademicaSlice = createSlice({
  name: 'ofertaAcademica',
  initialState,
  reducers: {

    set_unidad_filtered: (state, action) => {
      const { filteredData } = action.payload
      state.unidadAcademica.unidad.filtered = filteredData
    }

  },
  extraReducers: (builder) => {
    setUnidadAcademicaExtraReducers(builder)
    setExtensionThunks(builder)
  }
})

export const { set_unidad_filtered } = ofertaAcademicaSlice.actions
export default ofertaAcademicaSlice.reducer
