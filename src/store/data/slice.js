import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  general: {
    sectores: {
      loading: false,
      revalidating: false,
      error: null,
      data: [
        { text: 'Central' },
        { text: 'Externo' },
        { text: 'Interno' },
        { text: 'Unidad' }
      ]
    },
    dependencias: {
      loading: false,
      revalidating: false,
      error: null,
      data: {
        complete: [
          { sector: 'Central', nombre: 'Biblioteca', abreviatura: 'biblio', unidad: 'Abc' },
          { sector: 'Externo', nombre: 'Contabilidad', abreviatura: 'conta', unidad: 'Abc2' },
          { sector: 'Interno', nombre: 'Sección de cobros', abreviatura: 'cobros', unidad: 'Abc3' },
          { sector: 'Unidad', nombre: 'Unidad Municipal', abreviatura: 'muni', unidad: 'Abc4' }
        ],
        filtered: [
          { sector: 'Central', nombre: 'Biblioteca', abreviatura: 'biblio', unidad: 'Abc' },
          { sector: 'Externo', nombre: 'Contabilidad', abreviatura: 'conta', unidad: 'Abc2' },
          { sector: 'Interno', nombre: 'Sección de cobros', abreviatura: 'cobros', unidad: 'Abc3' },
          { sector: 'Unidad', nombre: 'Unidad Municipal', abreviatura: 'muni', unidad: 'Abc4' }
        ]
      }
    }
  }
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {

    set_general_dependencias_filtered: (state, action) => {
      const { filteredData } = action.payload
      state.general.dependencias.data.filtered = filteredData
    }

  }
})

export default dataSlice.reducer
export const { set_general_dependencias_filtered } = dataSlice.actions
