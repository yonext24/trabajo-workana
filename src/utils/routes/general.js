import { BASE_URL } from '@/utils/consts'
import { appFetch } from '../fetchHandler'

export const general = {
  sectores: {
    get: async () => {
      return await appFetch(`${BASE_URL}/rye/sector/sectores`)
    },
    switch: async (_, { id_sector, estado }) => {
      return await appFetch(`${BASE_URL}/rye/sector/actualizar`, {
        method: 'POST',
        body: JSON.stringify({ id_sector, estado: !estado })
      })
    },
    add: async (_, { nombre }) => {
      return await appFetch(`${BASE_URL}/rye/sector/nuevo`, {
        method: 'POST',
        body: JSON.stringify({ estado: true, nombre })
      })
    }
  },
  dependencias: {
    get: async () => {
      return await appFetch(`${BASE_URL}/rye/dependencia/dependencias`)
    },
    switch: async (_, { id_dependencia, id_unidad, id_sector, abreviatura, estado }) => {
      return await appFetch(`${BASE_URL}/rye/dependencia/actualizar`, {
        method: 'POST',
        body: JSON.stringify({
          id_dependencia,
          id_unidad,
          id_sector,
          estado: !estado,
          abreviatura
        })
      })
    },
    update: async (_, { id_dependencia, id_unidad, id_sector, abreviatura }) => {
      return await appFetch(`${BASE_URL}/rye/dependencia/actualizar`, {
        method: 'POST',
        body: JSON.stringify({
          id_dependencia,
          id_unidad,
          id_sector,
          estado: true,
          abreviatura
        })
      })
    },
    add: async (_, { id_unidad, id_sector, abreviatura, nombre }) => {
      return await appFetch(`${BASE_URL}/rye/dependencia/nuevo`, {
        method: 'POST',
        body: JSON.stringify({
          id_unidad,
          id_sector,
          estado: true,
          abreviatura,
          nombre
        })
      })
    }
  },
  puestos: {
    get: async () => {
      return await appFetch(`${BASE_URL}/rye/puesto/puestos`)
    },
    delete: async (_, { id_puesto }) => {
      return await appFetch(`${BASE_URL}/rye/puesto/actualizar`, {
        method: 'POST',
        body: JSON.stringify({ id_puesto, estado: false })
      })
    },
    add: async (_, { descripcion }) => {
      return await appFetch(`${BASE_URL}/rye/puesto/nuevo`, {
        method: 'POST',
        body: JSON.stringify({ estado: true, descripcion })
      })
    }
  },
  modulos: {
    get: async () => {
      return await appFetch(`${BASE_URL}/rye/modulo/modulos`)
    },
    add: async (_, { nombre, tipo }) => {
      return await appFetch(`${BASE_URL}/rye/modulo/nuevo`, {
        method: 'POST',
        body: JSON.stringify({ estado: true, nombre, tipo })
      })
    },
    switch_state: async (_, { id, estado }) => {
      return await appFetch(`${BASE_URL}/rye/modulo/actualizar`, {
        method: 'POST',
        body: JSON.stringify({ id, estado: !estado })
      })
    }
  }
}
