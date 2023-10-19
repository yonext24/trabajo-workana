import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { routes } from '@/utils/routes'

export const get_sectores_data = createAsyncThunk('general/get_sectores_data', async (_, api) => {
  const response = await routes.general.sectores.get(api)

  return response
})

export const delete_sectores_data = createAsyncThunk('general/delete_sectores_data', async ({ id_sector }, api) => {
  await routes.general.sectores.delete(api, { id_sector })

  return id_sector
})

export const update_sectores_data = createAsyncThunk('general/update_sectores_data', async ({ newData, nombre }, api) => {
  return { nombre, newData }
})

export const add_sectores_data = createAsyncThunk('general/add', async ({ newData }, api) => {
  const sector = await routes.general.sectores.add(api, { nombre: newData })

  return sector
})

const noLoopData = {
  name: 'sectores',
  get: {
    function: get_sectores_data
  },
  del: {
    function: delete_sectores_data,
    filterBy: 'id_sector'
  },
  update: {
    function: update_sectores_data,
    filterFunc: (data, el) => {
      console.log({ data, el })
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
