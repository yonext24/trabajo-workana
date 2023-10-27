/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { usuarios } from '@/utils/routes/usuarios'

/* **************************************************************************************

                                    ROLE THUNKS

************************************************************************************** */

export const get_roles_data = createAsyncThunk(
  'usuarios/roles/get_data',
  async (_, api) => {
    return await usuarios.roles.get(api)
  }
)

export const delete_role = createAsyncThunk(
  'usuarios/roles/delete',
  async (id_rol, api) => {
    await usuarios.roles.delete(api, { id_rol })

    return id_rol
  }
)
export const add_role = createAsyncThunk(
  'usuarios/roles/add',
  async (data, api) => {
    const { id_rol, estado } = await usuarios.roles.add(api, data)

    return { id_rol, ...data, estado }
  }
)
export const update_role = createAsyncThunk(
  'usuarios/roles/update',
  async ({ nombre, newData }, api) => {
    await new Promise(resolve => setTimeout(resolve, 1200))

    return { id: nombre, newData }
  }
)
export const get_role_permissions = createAsyncThunk(
  'usuarios/roles/get_permissions',
  async ({ id_rol }, api) => {
    const permissions = await usuarios.roles.getPermissions(api, id_rol)

    return { id_rol, permissions }
  }
)
/* **************************************************************************************

                                  PERMISSION THUNKS

  ************************************************************************************** */

export const get_permissions = createAsyncThunk(
  'usuarios/permisos/get',
  async (_, api) => {
    return await usuarios.permisos.get(api)
  }
)

export const delete_permission = createAsyncThunk(
  'usuarios/permisos/delete',
  async (permission, api) => {
    await new Promise(resolve => setTimeout(resolve, 1200))

    return permission
  }
)
export const add_permission = createAsyncThunk(
  'usuarios/permisos/create',
  async (permission, api) => {
    await new Promise(resolve => setTimeout(resolve, 1200))

    return permission
  }
)

export const switch_permission_state = createAsyncThunk(
  'usuarios/permisos/switch_state',
  async ({ id_permiso, estado }, api) => {
    await usuarios.permisos.switchStates(api, { id_permiso, estado })

    return { id_permiso, estado }
  }
)
/* **************************************************************************************

                                    USERS THUNKS

    ************************************************************************************** */

export const addUsuariosExtraReducers = builder => {
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
    }
  }
  const permisosExtraReducers = {
    name: 'permisos',
    get: {
      function: get_permissions
    },
    add: {
      function: add_permission
    },
    update: {
      function: switch_permission_state,
      filterBy: 'id_permiso'
    },
    del: {
      function: delete_permission,
      filterBy: 'id'
    }
  }

  setThunks({ builder, noLoopData: rolesExtraReducers })
  setThunks({ builder, noLoopData: permisosExtraReducers })

  builder.addCase(get_role_permissions.fulfilled, (state, action) => {
    const { permissions, id_rol } = action.payload

    state.roles.loading = false
    state.roles.revalidating = false
    state.roles.error = null
    const existingPermisoIndex = state.roles.permissionsData.findIndex(
      permiso => permiso.id_rol === id_rol
    )
    if (existingPermisoIndex !== -1) {
      state.roles.permissionsData[existingPermisoIndex] = {
        permissions,
        id_rol
      }
    } else {
      state.roles.permissionsData.push({ permissions, id_rol })
    }
  })
  builder.addCase(get_role_permissions.pending, (state, action) => {
    state.roles.revalidating = true
    state.roles.error = null
  })
  builder.addCase(get_role_permissions.rejected, (state, action) => {
    state.roles.loading = false
    state.roles.revalidating = false
    state.roles.error = action.payload
  })
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
