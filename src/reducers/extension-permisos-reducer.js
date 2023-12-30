import { removeIndexFromArray } from '@/utils/consts'

export const MODAL_PERMISOS_ACTIONS = {
  INITIALIZE: 'INITIALIZE',
  TOGGLE_PERMISO: 'TOGGLE_PERMISO',
  UPDATE_PERMISOS: 'UPDATE_PERMISOS'
}

/*
type PermisoExtension = {
  id_extension_permiso: number,
  nombre: string,
  descripcion: string
}

type AllPermisoExtension = PermisoExtension & {
  isIn: boolean
}
*/

export const INITIAL_STATE = {
  permisos: [],
  actualizando: []
}

export const ModalUpdatePermisosReducer = (state, action) => {
  if (action.type === MODAL_PERMISOS_ACTIONS.INITIALIZE) {
    return {
      actualizando: [],
      permisos: action.payload
    }
  }

  if (action.type === MODAL_PERMISOS_ACTIONS.TOGGLE_PERMISO) {
    const { id_permiso, estado, isIn } = action.payload // estado es el nuevo estado

    const permisos = state.permisos.map(permiso => {
      if (permiso.id_permiso === id_permiso) {
        return {
          ...permiso,
          estado
        }
      }
      return permiso
    })

    let actualizando = [...state.actualizando]

    console.log({ isIn, estado })

    if ((isIn && !estado) || (!isIn && estado)) {
      actualizando.push({ id_permiso, estado })
    } else {
      const index = actualizando.map(el => el.id_permiso).indexOf(id_permiso)
      actualizando = removeIndexFromArray(index, actualizando)
    }

    return { permisos, actualizando }
  }

  if (action.type === MODAL_PERMISOS_ACTIONS.UPDATE_PERMISOS) {
    const permisos = state.permisos.map(permiso => {
      const actualizando = state.actualizando.find(el => el.id_permiso === permiso.id_permiso)
      if (actualizando) {
        return {
          ...permiso,
          estado: actualizando.estado,
          isIn: actualizando.estado
        }
      }
      return permiso
    })

    return {
      permisos,
      actualizando: []
    }
  }

  return state
}
