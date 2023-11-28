import { createSlice } from '@reduxjs/toolkit'
import { get_geografia_municipios, get_geografia_params } from './thunks'

const initialState = {
  loading: false,
  revalidating: false,
  paises: [],
  departamentos: [],
  data: [],
  error: null,
  paginationData: {
    page: 1,
    pages: null,
    size: 10,
    selectedDepartamento: null,
    selectedPais: null
  }
}

const geografiaSlice = createSlice({
  initialState,
  name: 'geografia',
  reducers: {
    set_geografia_pagination_data: (state, action) => {
      const { size, page, departamento, pais } = action.payload

      console.log('set_geografia_pagination_data', action.payload)

      if (pais) state.paginationData.selectedPais = pais
      if (departamento) state.paginationData.selectedDepartamento = departamento
      if (size) {
        state.paginationData.size = size
        if (!page) state.paginationData.page = 1
      }
      if (page) state.paginationData.page = page
    }
  },
  extraReducers: builder => {
    builder
      .addCase(get_geografia_params.pending, state => {
        state.loading = true
        state.revalidating = true
      })
      .addCase(get_geografia_params.fulfilled, (state, action) => {
        state.loading = false
        state.revalidating = false
        state.paises = action.payload.paises
        state.departamentos = action.payload.departamentos
      })
      .addCase(get_geografia_params.rejected, (state, action) => {
        state.loading = false
        state.revalidating = false
        state.error = action.error
      })
      .addCase(get_geografia_municipios.pending, state => {
        state.loading = true
        state.revalidating = true
      })
      .addCase(get_geografia_municipios.fulfilled, (state, action) => {
        state.loading = false
        state.revalidating = false
        state.data = action.payload.items
        state.paginationData.pages = action.payload.pages
      })
      .addCase(get_geografia_municipios.rejected, (state, action) => {
        state.loading = false
        state.revalidating = false
        state.error = action.error
      })
  }
})

export const { set_geografia_pagination_data } = geografiaSlice.actions

export default geografiaSlice.reducer
