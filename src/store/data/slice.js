import { createSlice } from '@reduxjs/toolkit'
import { get_sections_data_extra_reducers } from './thunks'

const initialState = {
  general: {
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
    },
    puestos: {
      loading: false,
      revalidating: false,
      error: null,
      data: [
        'Cajero General',
        'Programador II',
        'Oficinista I',
        'Oficinista II'
      ]
    },
    modulos: {
      loading: false,
      revalidating: false,
      error: null,
      data: [
        'General',
        'Usuarios',
        'Unidad Académica',
        'Extensión'
      ]
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
    },

    set_sectores_data: (state, action) => {
      const { data } = action.payload
      state.general.sectores.data.push(data)
    },
    del_sectores_data: (state, action) => {
      const { text } = action.payload
      state.general.sectores.data = state.general.sectores.data.filter(el => el !== text)
    },
    upd_sectores_data: (state, action) => {
      const { text, newText } = action.payload
      state.general.sectores.data = state.general.sectores.data.map(el => {
        if (el === text) return newText
        return el
      })
    },

    add_dependencias_data: (state, action) => {
      const { data } = action.payload
      state.general.dependencias.data.complete.push(data)
    },
    upd_dependencias_data: (state, action) => {
      const { newData, nombre } = action.payload
      state.general.dependencias.data.complete = state.general.dependencias.data.complete.map(el => {
        if (el.nombre === nombre) return newData
        return el
      })
    },
    del_dependencias_data: (state, action) => {
      const { nombre } = action.payload
      state.general.dependencias.data.complete = state.general.dependencias.data.complete.filter(el => el.nombre !== nombre)
    },

    add_puestos_data: (state, action) => {
      const { data } = action.payload
      state.general.puestos.data.push(data)
    },
    del_puestos_data: (state, action) => {
      const { nombre } = action.payload
      state.general.puestos.data = state.general.puestos.data.filter(el => el !== nombre)
    },
    upd_puestos_data: (state, action) => {
      const { nombre, newData } = action.payload
      state.general.puestos.data = state.general.puestos.data.map(el => {
        if (el === nombre) return newData
        return el
      })
    },

    add_modulos_data: (state, action) => {
      const { data } = action.payload
      state.general.modulos.data.push(data)
    },
    del_modulos_data: (state, action) => {
      const { nombre } = action.payload
      state.general.modulos.data = state.general.modulos.data.filter(el => el !== nombre)
    },
    upd_modulos_data: (state, action) => {
      const { nombre, newData } = action.payload
      state.general.modulos.data = state.general.modulos.data.map(el => {
        if (el === nombre) return newData
        return el
      })
    }

  },
  extraReducers: (builder) => {
    get_sections_data_extra_reducers(builder)
  }
})

export default dataSlice.reducer
export const {
  set_general_dependencias_filtered,

  del_sectores_data,
  set_sectores_data,
  upd_sectores_data,

  add_dependencias_data,
  upd_dependencias_data,
  del_dependencias_data,

  add_puestos_data,
  del_puestos_data,
  upd_puestos_data,

  add_modulos_data,
  del_modulos_data,
  upd_modulos_data

} = dataSlice.actions
