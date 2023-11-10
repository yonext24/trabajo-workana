import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { general } from '@/utils/routes'

export const get_puestos = createAsyncThunk('general/get_puestos_data', async (_, api) => {
  return await general.puestos.get(api)
})

export const del_puestos = createAsyncThunk('general/delete_puestos_data', async ({ id_puesto }, api) => {
  await general.puestos.delete(api, { id_puesto })

  return id_puesto
})

// export const update_puestos = createAsyncThunk('general/update_puestos_data', async ({ newData, nombre }, api) => {
//   return { nombre, newData }
// })

export const add_puestos = createAsyncThunk('general/add_puestos_data', async (data, api) => {
  return await general.puestos.add(api, data)
})

const noLoopData = {
  name: 'puestos',
  get: {
    function: get_puestos
  },
  del: {
    function: del_puestos,
    filterBy: 'id_puesto'
  },
  // update: {
  //   function: update_puestos,
  //   filterFunc: (data, el) => {
  //     console.log({ data, el })
  //     if (data.nombre === el) return data.newData
  //     return el
  //   }
  // },
  add: {
    function: add_puestos
  }
}

export const setPuestosThunks = builder => {
  setThunks({ noLoopData, builder, hasFiltered: false })
}
