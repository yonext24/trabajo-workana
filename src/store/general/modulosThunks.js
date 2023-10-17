import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'

export const get_modulos = createAsyncThunk('general/get_modulos_data', async () => {
  const fakeInitialState = [
    { tipo: 'Operación', nombre: 'Crear', estado: 1 },
    { tipo: 'Operación', nombre: 'Leer', estado: 1 },
    { tipo: 'Operación', nombre: 'Actualizar', estado: 1 },
    { tipo: 'Módulo', nombre: 'General', estado: 1 },
    { tipo: 'Módulo', nombre: 'Usuarios', estado: 1 },
    { tipo: 'Módulo', nombre: 'Unidad académica', estado: 1 },
    { tipo: 'Módulo', nombre: 'Extensión', estado: 1 }
  ]

  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeInitialState
})

export const del_modulos = createAsyncThunk('general/delete_modulos_data', async ({ nombre }, api) => {
  return nombre
})

export const update_modulos = createAsyncThunk('general/update_modulos_data', async ({ newData, nombre }, api) => {
  return { nombre, newData }
})

export const add_modulos = createAsyncThunk('general/add_modulos_data', async ({ newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return newData
})

const noLoopData = {
  name: 'modulos',
  get: {
    function: get_modulos
  },
  del: {
    function: del_modulos,
    filterBy: 'nombre'
  },
  update: {
    function: update_modulos,
    filterBy: 'nombre'
  },
  add: {
    function: add_modulos
  }
}

export const setModulosThunks = builder => {
  setThunks({ noLoopData, builder, hasFiltered: true })
}
