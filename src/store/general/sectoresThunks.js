import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { general } from '@/utils/routes'

export const get_sectores_data = createAsyncThunk('general/get_sectores_data', async (_, api) => {
  return await general.sectores.get(api)
})

export const switch_sectores_data = createAsyncThunk('general/delete_sectores_data', async (data, api) => {
  await general.sectores.switch(api, data)

  return data
})

export const update_sectores_data = createAsyncThunk('general/update_sectores_data', async ({ newData, nombre }) => {
  return { nombre, newData }
})

export const add_sectores_data = createAsyncThunk('general/add', async ({ newData }, api) => {
  const sector = await general.sectores.add(api, { nombre: newData })

  return sector
})

const noLoopData = {
  name: 'sectores',
  get: {
    function: get_sectores_data
  },
  switch_state: {
    function: switch_sectores_data,
    filterBy: 'id_sector'
  },
  update: {
    function: update_sectores_data,
    filterFunc: (data, el) => {
      if (data.nombre === el) return data.newData
      return el
    }
  },
  add: {
    function: add_sectores_data
  }
}

export const setSectoresThunks = builder => {
  setThunks({ noLoopData, builder, hasFiltered: false })
}
