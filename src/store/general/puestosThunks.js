import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { routes } from '@/utils/routes'

export const get_puestos = createAsyncThunk('general/get_puestos_data', async (_, api) => {
  return await routes.general.puestos.get(api)
})

export const del_puestos = createAsyncThunk('general/delete_puestos_data', async ({ id_puesto }, api) => {
  await routes.general.puestos.delete(api, { id_puesto })

  return id_puesto
})

// export const update_puestos = createAsyncThunk('general/update_puestos_data', async ({ newData, nombre }, api) => {
//   return { nombre, newData }
// })

export const add_puestos = createAsyncThunk('general/add_puestos_data', async ({ descripcion }, api) => {
  const { id_puesto } = await routes.general.puestos.add(api, { descripcion })

  return { descripcion, id_puesto }
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
