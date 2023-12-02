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
    selectedUnidad: null,
    selectedTipo: null,
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
      error: null,
      paginationData: {
        nivel: null,
        size: 10,
        page: 1,
        pages: null
      }
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
    set_extension_error: (state, action) => {
      const { error } = action.payload
      state.extension.error = error
    },
    set_carrera_error: (state, action) => {
      const { error } = action.payload
      state.carrera.carrera.error = error
    },
    set_unidad_filtered: (state, action) => {
      const { filteredData } = action.payload
      state.unidadAcademica.unidad.filtered = filteredData
    },
    set_extension_selected_unidad: (state, action) => {
      const { unidad, tipo } = action.payload
      if (tipo) state.extension.selectedTipo = tipo
      if (unidad) state.extension.selectedUnidad = unidad
    },
    set_recurso_filtered: (state, action) => {
      const { filteredData } = action.payload
      state.carrera.recurso.filtered = filteredData
    },
    set_carrera_carrera_pagination_data: (state, action) => {
      const { size, page, nivel } = action.payload

      if (size) state.carrera.carrera.paginationData.size = size
      if (page) state.carrera.carrera.paginationData.page = page
      if (nivel) state.carrera.carrera.paginationData.nivel = nivel
    }
  },
  extraReducers: builder => {
    setUnidadAcademicaExtraReducers(builder)
    setExtensionThunks(builder)
    setCarreraThunks(builder)
  }
})

export const {
  set_unidad_filtered,
  set_extension_selected_unidad,
  set_recurso_filtered,
  set_carrera_carrera_pagination_data,
  set_extension_error,
  set_carrera_error
} = ofertaAcademicaSlice.actions
export default ofertaAcademicaSlice.reducer
