import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'

export const get_puestos = createAsyncThunk('general/get_puestos_data', async () => {
  const fakeInitialState = [
    'Cajero General',
    'Programador II',
    'Oficinista I',
    'Oficinista II'
  ]
  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeInitialState
})

export const del_puestos = createAsyncThunk('general/delete_puestos_data', async ({ nombre }, api) => {
  return nombre
})

export const update_puestos = createAsyncThunk('general/update_puestos_data', async ({ newData, nombre }, api) => {
  return { nombre, newData }
})

export const add_puestos = createAsyncThunk('general/add_puestos_data', async ({ newData }) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return newData
})

const noLoopData = {
  name: 'puestos',
  get: {
    function: get_puestos
  },
  del: {
    function: del_puestos,
    filterFunc: (data, el) => {
      if (data === el) return undefined
      return el
    }
  },
  update: {
    function: update_puestos,
    filterFunc: (data, el) => {
      console.log({ data, el })
      if (data.nombre === el) return data.newData
      return el
    }
  },
  add: {
    function: add_puestos
  }
}

export const setPuestosThunks = builder => {
  setThunks({ noLoopData, builder, hasFiltered: false })
}
