import { fakeData } from '@/assets/fake-api-call'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'

export const get_role_permissions = createAsyncThunk('usuarios/roles/get_permissions', async ({ role }, api) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  const modulos = api.getState().data.general.modulos.data

  let data = fakeData({ modulo: 10, operacion: 8, unidad: 7, extension: 6, nivel: 5 })

  const operaciones = ['Create', 'Delete', 'Update', 'Read']

  data = data.map((_, id) => ({
    id,
    unidad: 1,
    nivel: 2,
    extension: 3,
    operacion: operaciones[Math.floor(Math.random() * operaciones.length)],
    modulo: modulos[Math.floor(Math.random() * modulos.length)]
  }))

  return { role, data }
})

export const get_permisos_data = createAsyncThunk('usuarios/permisos/get_data', async (revalidate = true, api) => {
  const permisos = api.getState().usuarios.permisos.data
  if (permisos.length > 0 && !revalidate) return permisos

  await new Promise(resolve => setTimeout(resolve, 2000))
  const modulos = api.getState().data.general.modulos.data

  const data = fakeData({ modulo: 10, operacion: 8, unidad: 7, extension: 6, nivel: 5 })

  const operaciones = ['Create', 'Delete', 'Update', 'Read']

  return data.map((el, id) => ({
    id,
    unidad: 1,
    nivel: 2,
    extension: 3,
    operacion: operaciones[Math.floor(Math.random() * operaciones.length)],
    modulo: modulos[Math.floor(Math.random() * modulos.length)]
  }))
})

/* **************************************************************************************

                                    ROLE THUNKS

************************************************************************************** */

export const get_roles_data = createAsyncThunk('usuarios/roles/get_data', async (_, api) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeData({ nombre: 10, descripcion: 20 })
})

export const delete_role = createAsyncThunk('usuarios/roles/delete', async (nombre, api) => {
  await new Promise(resolve => setTimeout(resolve, 1200))

  return nombre
})
export const add_role = createAsyncThunk('usuarios/roles/add', async (role, api) => {
  await new Promise(resolve => setTimeout(resolve, 1200))

  return role
})
export const update_role = createAsyncThunk('usuarios/roles/update', async ({ nombre, newData }, api) => {
  await new Promise(resolve => setTimeout(resolve, 1200))

  return { id: nombre, newData }
})
/* **************************************************************************************

                                  PERMISSION THUNKS

  ************************************************************************************** */

export const delete_permission = createAsyncThunk('usuarios/permisos/delete', async (permission, api) => {
  await new Promise(resolve => setTimeout(resolve, 1200))

  return permission
})
export const add_permission = createAsyncThunk('usuarios/permisos/create', async (permission, api) => {
  await new Promise(resolve => setTimeout(resolve, 1200))

  return permission
})
export const update_permission = createAsyncThunk('usuarios/permisos/update', async (permission, api) => {
  await new Promise(resolve => setTimeout(resolve, 1200))

  return permission
})
/* **************************************************************************************

                                    USERS THUNKS

    ************************************************************************************** */

export const addUsuariosExtraReducers = (builder) => {
  const rolesExtraReducers = {
    name: 'roles',
    get: {
      function: get_roles_data
    },
    add: {
      function: add_role
    },
    update: {
      function: update_role,
      filterBy: 'nombre'
    },
    del: {
      function: delete_role,
      filterBy: 'nombre'
    },
    customs: [
      {
        function: get_role_permissions,
        fulfilled: ({ actualData, setProperty, payload }) => {

        }
      }
    ]

  }
  const permisosExtraReducers = {
    name: 'permisos',
    get: {
      function: get_permisos_data
    },
    add: {
      function: add_permission
    },
    update: {
      function: update_permission,
      filterBy: 'id'
    },
    del: {
      function: delete_permission,
      filterBy: 'id'
    }
  }

  setThunks({ builder, noLoopData: rolesExtraReducers })
  setThunks({ builder, noLoopData: permisosExtraReducers })
}

// builder.addCase(delete_role.fulfilled, (state, action) => {
//   const { nombre } = action.payload
//   state.roles.loading = false
//   state.roles.revalidating = false
//   state.roles.error = null
//   state.roles.data = state.roles.data.filter(el => el.nombre !== nombre)
// })
// builder.addCase(add_role.fulfilled, (state, action) => {
//   const { role } = action.payload
//   state.roles.loading = false
//   state.roles.revalidating = false
//   state.roles.error = null
//   state.roles.data.push(role)
// })
// builder.addCase(add_permission.fulfilled, (state, action) => {
//   const { permission } = action.payload
//   state.permisos.loading = false
//   state.permisos.revalidating = false
//   state.permisos.error = null
//   state.permisos.data.push(permission)
// })
// builder.addCase(update_permission.fulfilled, (state, action) => {
//   const { permission } = action.payload
//   state.permisos.loading = false
//   state.permisos.revalidating = false
//   state.permisos.error = null
//   state.permisos.data = state.permisos.data.map(el => {
//     if (el.id === permission.id) return permission
//     return el
//   })
// })
// builder.addCase(delete_permission.fulfilled, (state, action) => {
//   const { permission } = action.payload
//   state.permisos.loading = false
//   state.permisos.revalidating = false
//   state.permisos.error = null
//   state.permisos.data = state.permisos.data.filter(el => el.id !== permission.id)
// })
