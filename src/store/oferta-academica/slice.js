import { createSlice } from '@reduxjs/toolkit'
import { setUnidadAcademicaExtraReducers } from './unidadThunks'
import { setExtensionThunks } from './extensionThunks'
import { setCarreraThunks } from './carreraThunks'

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
  },
  carrera: {
    nivel: {
      loading: false,
      revalidating: false,
      data: [],
      error: null
    },
    carrera: {
      loading: false,
      revalidating: false,
      data: [],
      filtered: [],
      error: null
    },
    tipo_recurso: {
      loading: false,
      revalidating: false,
      data: [],
      error: null
    },
    recurso: {
      loading: false,
      revalidating: false,
      data: [],
      filtered: [],
      error: null
    }
  }
}

export const ofertaAcademicaSlice = createSlice({
  name: 'ofertaAcademica',
  initialState,
  reducers: {

    set_unidad_filtered: (state, action) => {
      const { filteredData } = action.payload
      state.unidadAcademica.unidad.filtered = filteredData
    },
    set_extension_filtered: (state, action) => {
      const { filteredData } = action.payload
      state.extension.filtered = filteredData
    },
    set_recurso_filtered: (state, action) => {
      const { filteredData } = action.payload
      state.carrera.recurso.filtered = filteredData
    },
    set_carrera_carrera_filtered: (state, action) => {
      const { filteredData } = action.payload
      state.carrera.carrera.filtered = filteredData
    }

  },
  extraReducers: (builder) => {
    setUnidadAcademicaExtraReducers(builder)
    setExtensionThunks(builder)
    setCarreraThunks(builder)
  }
})

export const { set_unidad_filtered, set_extension_filtered, set_recurso_filtered, set_carrera_carrera_filtered } = ofertaAcademicaSlice.actions
export default ofertaAcademicaSlice.reducer
