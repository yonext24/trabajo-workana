import { createAsyncThunk } from '@reduxjs/toolkit'
import { fakeApiCall } from '../../assets/fake-api-call'
import { setThunks } from '../setThunks'

export const get_sectores_data = createAsyncThunk('general/get_sectores_data', async () => {
  const fakeInitialState = [
    'Central',
    'Externo',
    'Interno',
    'Unidad'
  ]
  const response = await fakeApiCall.sectores(false, 2000, fakeInitialState, 5)

  return response
})

export const delete_sectores_data = createAsyncThunk('general/delete_sectores_data', async ({ nombre }, api) => {
  return nombre
})

export const update_sectores_data = createAsyncThunk('general/update_sectores_data', async ({ newData, nombre }, api) => {
  return { nombre, newData }
})

export const add_sectores_data = createAsyncThunk('general/add', async ({ newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return newData
})

const noLoopData = {
  name: 'sectores',
  get: {
    function: get_sectores_data
  },
  del: {
    function: delete_sectores_data,
    filterFunc: (data, el) => {
      if (data === el) return undefined
      return el
    }
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
