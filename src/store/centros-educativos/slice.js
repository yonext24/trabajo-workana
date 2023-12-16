import { createSlice } from '@reduxjs/toolkit'
import { get_centros_establecimientos } from './thunks'

const initialState = {
  loading: false,
  revalidating: false,
  departamentos: [],
  municipios: [],
  sectores: [],
  data: [],
  error: null,
  paginationData: {
    page: 1,
    pages: null,
    size: 10,
    selectedDepartamento: null,
    selectedMunicipio: null,
    selectedSector: null
  }
}

const centrosEducativosSlice = createSlice({
  name: 'centrosEducativos',
  initialState,
  reducers: {
    set_pagination_data: (state, action) => {
      const { page, size, pages, selectedDepartamento, selectedMunicipio, selectedSector } = action.payload
      if (page) state.paginationData.page = page
      if (size) state.paginationData.size = size
      if (pages) state.paginationData.pages = pages
      if (selectedDepartamento) state.paginationData.selectedDepartamento = selectedDepartamento
      if (selectedMunicipio) state.paginationData.selectedMunicipio = selectedMunicipio
      if (selectedSector) state.paginationData.selectedSector = selectedSector
    }
  },
  extraReducers: builder => {
    builder.addCase(get_centros_establecimientos.fulfilled, (state, action) => {
      state.loading = false
      state.revalidating = false
      state.data = action.payload.items
      state.paginationData.pages = action.payload.pages
    })
    builder.addCase(get_centros_establecimientos.pending, state => {
      state.loading = true
      state.revalidating = true
    })
    builder.addCase(get_centros_establecimientos.rejected, (state, action) => {
      state.loading = false
      state.revalidating = false
      state.error = action.error
    })
  }
})

export default centrosEducativosSlice.reducer
export const { set_pagination_data } = centrosEducativosSlice.actions
