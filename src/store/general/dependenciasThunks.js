import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { general } from '@/utils/routes'
import { get_usuarios_parametros } from '../usuarios/thunks'

export const get_dependencias = createAsyncThunk(
  'general/get_dependencias_data',
  async (_, api) => {
    const { dependencias } = await general.dependencias.get(api)
    return dependencias
  }
)

export const del_dependencias = createAsyncThunk(
  'general/delete_dependencias_data',
  async (data, api) => {
    await general.dependencias.delete(api, data)

    return data.id_dependencia
  }
)

export const update_dependencias = createAsyncThunk(
  'general/update_dependencias_data',
  async (data, api) => {
    const id_dependencia = data?.id_dependencia
    const { unidad, sector } = data
    const { id_sector, nombre: nombreSector } = sector
    const { id_unidad, nombre: nombreUnidad } = unidad
    await general.dependencias.update(api, data)

    return {
      id_dependencia,
      newData: {
        ...data,
        id_sector,
        id_unidad,
        sector: nombreSector,
        unidad: nombreUnidad
      }
    }
  }
)

export const add_dependencias = createAsyncThunk(
  'general/add_dependencias_data',
  async (data, api) => {
    const { id_dependencia } = await general.dependencias.add(api, {
      ...data,
      id_unidad: 0
    }) // <--- ID_UNIDAD = PLACEHOLDER

    return { id_dependencia, ...data }
  }
)

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
  builder.addCase(get_usuarios_parametros.fulfilled, (state, action) => {
    const { dependencias, puestos } = action.payload

    state.dependencias.data = dependencias
    state.puestos.data = puestos

    state.dependencias.loading = false
    state.dependencias.revalidating = false

    state.puestos.loading = false
    state.puestos.revalidating = false
  })

  builder.addCase(get_usuarios_parametros.pending, state => {
    state.dependencias.loading = true
    state.dependencias.revalidating = true

    state.puestos.loading = true
    state.puestos.revalidating = true
  })

  builder.addCase(get_usuarios_parametros.rejected, (state, action) => {
    const data = action.payload

    state.dependencias.loading = false
    state.dependencias.revalidating = false

    state.puestos.loading = false
    state.puestos.revalidating = false

    state.dependencias.error = data
    state.puestos.error = data
  })

  setThunks({ noLoopData, builder, hasFiltered: true })
}
