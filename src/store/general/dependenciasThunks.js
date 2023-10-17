import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'

export const get_dependencias = createAsyncThunk('general/get_dependencias_data', async () => {
  const fakeInitialState = [
    { sector: 'Central', nombre: 'Biblioteca', abreviatura: 'biblio', unidad: 'Abc' },
    { sector: 'Externo', nombre: 'Contabilidad', abreviatura: 'conta', unidad: 'Abc2' },
    { sector: 'Interno', nombre: 'Sección de cobros', abreviatura: 'cobros', unidad: 'Abc3' },
    { sector: 'Unidad', nombre: 'Unidad Municipal', abreviatura: 'muni', unidad: 'Abc4' }
  ]

  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeInitialState
})

export const del_dependencias = createAsyncThunk('general/delete_dependencias_data', async ({ nombre }, api) => {
  return nombre
})

export const update_dependencias = createAsyncThunk('general/update_dependencias_data', async ({ newData, nombre }, api) => {
  return { nombre, newData }
})

export const add_dependencias = createAsyncThunk('general/add_dependencias_data', async ({ newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return newData
})

const noLoopData = {
  name: 'dependencias',
  get: {
    function: get_dependencias
  },
  del: {
    function: del_dependencias,
    filterBy: 'nombre'
  },
  update: {
    function: update_dependencias,
    filterBy: 'nombre'
  },
  add: {
    function: add_dependencias
  }
}

export const setDependenciasThunks = builder => {
  setThunks({ noLoopData, builder, hasFiltered: true })
}
