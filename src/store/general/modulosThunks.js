import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { general } from '@/utils/routes'

export const get_modulos = createAsyncThunk('general/get_modulos_data', async (_, api) => {
  return await general.modulos.get(api)
})

export const switch_state_modulos = createAsyncThunk('general/delete_modulos_data', async (data, api) => {
  await general.modulos.switch_state(api, data)

  return data
})

export const update_modulos = createAsyncThunk('general/update_modulos_data', async ({ newData, nombre }) => {
  return { nombre, newData }
})

export const add_modulos = createAsyncThunk('general/add_modulos_data', async (data, api) => {
  const modulo = await general.modulos.add(api, data)

  return modulo
})

const noLoopData = {
  name: 'modulos',
  get: {
    function: get_modulos
  },
  switch_state: {
    function: switch_state_modulos,
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
