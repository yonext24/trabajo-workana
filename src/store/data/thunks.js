/* eslint-disable no-unused-vars */

import { createAsyncThunk } from '@reduxjs/toolkit'
import { fakeApiCall } from '../../assets/fake-api-call'
import { toast } from 'react-toastify'

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

export const delete_sectores_data = createAsyncThunk('general/delete_sectores_data', async ({ id }, api) => {
  await new Promise((resolve, reject) => setTimeout(() => { [resolve, reject][Math.floor(Math.random() * 2)]() }, 2000))
})

export const get_sections_data_extra_reducers = (builder) => {
  builder.addCase(get_sectores_data.pending, (state, action) => defaultPendingGetCase('sectores', state, action))
  builder.addCase(get_sectores_data.rejected, (state, action) => defaultRejectedGetCase('sectores', state, action))
  builder.addCase(get_sectores_data.fulfilled, (state, action) => defaultFulfilledGetCase('sectores', state, action))
}

function defaultFulfilledDelCase (place, state, action) {
  state.general[place].loading = false
  state.general[place].revalidating = false
  state.general[place].error = null
  state.general[place].data = state.general[place].data.filter(el => el.id !== action.payload)
}
function defaultRejectedDelCase (place, state, action) {
  state.general[place].loading = false
  state.general[place].revalidating = false
  state.general[place].error = 'Hubo un error al borrar el ' + place
}
function defaultPendingDelCase (place, state, action) {
  state.general[place].loading = true
  state.general[place].revalidating = true
  state.general[place].error = null
}
function defaultPendingGetCase (place, state, action) {
  if (state.general[place].data.length === 0) {
    state.general[place].loading = true
  }
  state.general[place].revalidating = true
  state.general[place].error = null
}
function defaultRejectedGetCase (place, state, action) {
  state.general[place].loading = false
  state.general[place].revalidating = false
  state.general[place].error = 'Hubo un error al recuperar los datos'
  toast.error('Hubo un error al recuperar los datos de los ' + place)
}
function defaultFulfilledGetCase (place, state, action) {
  state.general[place].loading = false
  state.general[place].revalidating = false
  state.general[place].error = null
  state.general[place].data = action.payload
}
