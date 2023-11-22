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

const noLoopData = {
  name: 'extension',
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

export const setExtensionThunks = builder => {
  setThunks({ builder, noLoopData, hasFiltered: true })
}
