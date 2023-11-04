/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setThunks } from '../setThunks'
import { usuarios } from '@/utils/routes/usuarios'
import { mergeValues } from '@/utils/consts'

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
  async (data, api) => {
    const rol = data
    const { id_rol } = rol

    await usuarios.roles.update(api, data)

    return { id_rol, ...data }
  }
)
export const get_role_permissions = createAsyncThunk(
  'usuarios/roles/get_permissions',
  async ({ id_rol }, api) => {
    const permissions = await usuarios.roles.getPermissions(api, id_rol)

    return { id_rol, permissions }
  }
)
export const get_mapped_role_permissions = createAsyncThunk(
  'usuarios/roles/get_mapped_permissions',
  async ({ id_rol }, api) => {
    const permissions = await usuarios.roles.getMappedPermissions(api, id_rol)

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

export const find_user = createAsyncThunk(
  'usuarios/usuarios/find',
  async (data, api) => {
    return await usuarios.usuarios.search(api, data)
  }
)

export const create_user = createAsyncThunk(
  'usuarios/usuarios/create',
  async (data, api) => {
    return await usuarios.usuarios.create(api, data)
  }
)

export const get_usuarios_parametros = createAsyncThunk(
  'usuarios/usuarios/get_parametros',
  async (_, api) => {
    return await usuarios.usuarios.getParameters(api)
  }
)

export const update_user = createAsyncThunk(
  'usuarios/usuarios/update',
  async (data, api) => {
    await usuarios.usuarios.update(api, data)
    return data
    // Este modus operandi no es el óptimo, pero no depende de mi lo que sale de la api
  }
)

export const delete_user = createAsyncThunk(
  'usuarios/usuarios/delete',
  async (data, api) => {
    await usuarios.usuarios.delete(api, data)
    return data.usuario
  }
)

/* ***************************************************************************************

                                      SET THUNKS
                                      
*************************************************************************************** */

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
      filterFunc: (data, el) => {
        const { actualizar, rol } = data
        if (rol?.id_rol === el.id_rol) {
          actualizar.forEach(({ id_permiso, estado }) => {
            const permisoIndex = el.permisos.findIndex(
              permiso => permiso.id_permiso === id_permiso
            )
            if (permisoIndex !== -1) {
              el.permisos[permisoIndex].estado = estado
            }
          })

          return { ...el, ...rol }
        }
        return el
      }
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
      function: switch_permission_state
    },
    del: {
      function: delete_permission,
      filterBy: 'id'
    }
  }
  const usuariosExtraReducers = {
    name: 'usuarios',
    get: {
      function: find_user,
      customFunc: ({ state, data, setProperty }) => {
        const { general, otros } = data
        console.log(data)
        setProperty({
          property: 'showing',
          state,
          value: { ...general, otros }
        })
      }
    },
    add: {
      function: create_user
    },
    update: {
      function: update_user,
      customFunc: ({ state, data, setProperty, getProperty }) => {
        const actualData = getProperty({ property: 'showing', state })

        const {
          dependencia,
          id_dependencia,
          puesto,
          id_puesto,
          rol,
          id_rol,
          ref_oficio,
          fecha_desactivacion
        } = data
        const mergedOtros = mergeValues(
          {
            dependencia,
            id_dependencia,
            puesto,
            id_puesto,
            rol,
            id_rol,
            ref_oficio,
            fecha_desactivacion
          },
          actualData.otros
        )

        const mergedData = { ...actualData, ...data, otros: mergedOtros }

        setProperty({ property: 'showing', state, value: mergedData })
      }
    }
  }

  setThunks({ builder, noLoopData: rolesExtraReducers })
  setThunks({ builder, noLoopData: permisosExtraReducers })
  setThunks({ builder, noLoopData: usuariosExtraReducers })

  builder.addCase(get_usuarios_parametros.fulfilled, (state, action) => {
    const { roles } = action.payload
    state.roles.loading = false
    state.roles.revalidating = false
    state.roles.error = null
    state.roles.data = roles
  })
  builder.addCase(get_usuarios_parametros.pending, (state, action) => {
    state.roles.revalidating = true
    state.roles.error = null
  })
  builder.addCase(get_usuarios_parametros.rejected, (state, action) => {
    state.roles.loading = false
    state.roles.revalidating = false
    state.roles.error = action.payload
  })

  builder.addCase(get_mapped_role_permissions.fulfilled, (state, action) => {
    const { id_rol, permissions } = action.payload

    state.roles.loading = false
    state.roles.revalidating = false
    state.roles.error = null

    const existingPermisoIndex = state.roles.data.findIndex(
      permiso => permiso.id_rol === id_rol
    )

    if (existingPermisoIndex !== -1) {
      state.roles.data[existingPermisoIndex].permisos = permissions
    } else {
      state.roles.data.push({ permisos: permissions, id_rol })
    }
  })

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
