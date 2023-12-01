import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { general } from '@/utils/routes'

export const get_puestos = createAsyncThunk('general/get_puestos_data', async (_, api) => {
  return await general.puestos.get(api)
})

export const switch_state_puestos = createAsyncThunk('general/delete_puestos_data', async (data, api) => {
  await general.puestos.switch_state(api, data)

  return data
})

export const add_puestos = createAsyncThunk('general/add_puestos_data', async (data, api) => {
  return await general.puestos.add(api, data)
})

const noLoopData = {
  name: 'puestos',
  get: {
    function: get_puestos
  },
  switch_state: {
    function: switch_state_puestos,
    filterBy: 'id_puesto'
  },

  add: {
    function: add_puestos
  }
}

export const setPuestosThunks = builder => {
  setThunks({ noLoopData, builder, hasFiltered: false })
}
