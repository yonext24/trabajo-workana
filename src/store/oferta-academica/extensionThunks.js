import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { extension } from '@/utils/routes'

export const get_extension_data = createAsyncThunk('oferta-academica/extension/get', async data => {
  return await extension.get(data)
})
export const add_extension = createAsyncThunk('oferta-academica/extension/add', async data => {
  const unidad = data.unidad
  const res = await extension.add(data)

  return { ...res, unidad }
})
export const update_extension = createAsyncThunk('oferta-academica/extension/update', async data => {
  await extension.update(data)

  return data
})

export const get_extension_permiso = createAsyncThunk('oferta-academica/extension/permiso/get', async () => {
  return await extension.permiso.get()
})
export const add_extension_permiso = createAsyncThunk('oferta-academica/extension/permiso/add', async data => {
  const res = await extension.permiso.add(data)
  return res
})
export const update_extension_permiso = createAsyncThunk('oferta-academica/extension/permiso/update', async data => {
  await extension.permiso.update(data)
  return data
})
export const switch_state_extension_permiso = createAsyncThunk(
  'oferta-academica/extension/permiso/switch_state',
  async data => {
    await extension.permiso.switch_state(data)
    return data
  }
)

const toLoop = [
  {
    extension: {
      get: {
        function: get_extension_data
      },
      add: {
        function: add_extension
      },
      update: {
        function: update_extension,
        filterBy: 'id_extension'
      }
    }
  },
  {
    permiso: {
      get: {
        function: get_extension_permiso
      },
      add: {
        function: add_extension_permiso
      },
      update: {
        function: update_extension_permiso,
        filterBy: 'id_permiso'
      },
      switch_state: {
        function: switch_state_extension_permiso,
        filterBy: 'id_permiso'
      }
    }
  }
]

export const setExtensionThunks = builder => {
  setThunks({ builder, toLoop, hasFiltered: true, placeName: 'extension' })
}
