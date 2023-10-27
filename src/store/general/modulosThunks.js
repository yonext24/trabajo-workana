import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { general } from '@/utils/routes'

export const get_modulos = createAsyncThunk(
  'general/get_modulos_data',
  async (_, api) => {
    return await general.modulos.get(api)
  }
)

export const del_modulos = createAsyncThunk(
  'general/delete_modulos_data',
  async ({ id }, api) => {
    await general.modulos.delete(api, { id })

    return id
  }
)

export const update_modulos = createAsyncThunk(
  'general/update_modulos_data',
  async ({ newData, nombre }, api) => {
    return { nombre, newData }
  }
)

export const add_modulos = createAsyncThunk(
  'general/add_modulos_data',
  async (data, api) => {
    const modulo = await general.modulos.add(api, data)

    return modulo
  }
)

const noLoopData = {
  name: 'modulos',
  get: {
    function: get_modulos
  },
  del: {
    function: del_modulos,
    filterBy: 'id'
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
