import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { routes } from '@/utils/routes'

export const get_dependencias = createAsyncThunk('general/get_dependencias_data', async (_, api) => {
  const { dependencias } = await routes.general.dependencias.get(api)
  return dependencias
})

export const del_dependencias = createAsyncThunk('general/delete_dependencias_data', async (data, api) => {
  await routes.general.dependencias.delete(api, data)

  return data.id_dependencia
})

export const update_dependencias = createAsyncThunk('general/update_dependencias_data', async (data, api) => {
  const id_dependencia = data?.id_dependencia
  await routes.general.dependencias.update(api, data)

  return { id_dependencia, newData: data }
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
    filterBy: 'id_dependencia'
  },
  update: {
    function: update_dependencias,
    filterBy: 'id_dependencia'
  },
  add: {
    function: add_dependencias
  }
}

export const setDependenciasThunks = builder => {
  setThunks({ noLoopData, builder, hasFiltered: true })
}
