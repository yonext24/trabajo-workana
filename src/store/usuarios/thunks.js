import { createAsyncThunk } from '@reduxjs/toolkit'
/* **************************************************************************************

                                    ROLE THUNKS

************************************************************************************** */
export const delete_role = createAsyncThunk('usuarios/roles/delete', async (nombre, api) => {
  await new Promise(resolve => setTimeout(resolve, 1200))

  return nombre
})
export const add_role = createAsyncThunk('usuarios/roles/add', async (role, api) => {
  await new Promise(resolve => setTimeout(resolve, 1200))

  return role
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

export const add_roles_extraReducers = (builder) => {
  builder.addCase(delete_role.fulfilled, (state, action) => {
    const { nombre } = action.payload
    state.roles.loading = false
    state.roles.revalidating = false
    state.roles.error = null
    state.roles.data = state.roles.data.filter(el => el.nombre !== nombre)
  })
  builder.addCase(add_role.fulfilled, (state, action) => {
    const { role } = action.payload
    state.roles.loading = false
    state.roles.revalidating = false
    state.roles.error = null
    state.roles.data.push(role)
  })
  builder.addCase(add_permission.fulfilled, (state, action) => {
    const { permission } = action.payload
    state.permisos.loading = false
    state.permisos.revalidating = false
    state.permisos.error = null
    state.permisos.data.push(permission)
  })
  builder.addCase(update_permission.fulfilled, (state, action) => {
    const { permission } = action.payload
    state.permisos.loading = false
    state.permisos.revalidating = false
    state.permisos.error = null
    state.permisos.data = state.permisos.data.map(el => {
      if (el.id === permission.id) return permission
      return el
    })
  })
  builder.addCase(delete_permission.fulfilled, (state, action) => {
    const { permission } = action.payload
    state.permisos.loading = false
    state.permisos.revalidating = false
    state.permisos.error = null
    state.permisos.data = state.permisos.data.filter(el => el.id !== permission.id)
  })
}
