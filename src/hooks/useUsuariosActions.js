import { set_permisos_filtered, set_usuarios_showing } from '@/store/usuarios/slice'
import {
  add_permission,
  add_role,
  create_user,
  delete_permission,
  switch_state_role,
  delete_user,
  find_user,
  get_mapped_role_permissions,
  get_permissions,
  get_role_permissions,
  get_roles_data,
  get_usuarios_parametros,
  switch_permission_state,
  update_role,
  update_user
} from '@/store/usuarios/thunks'
import { useDispatch } from 'react-redux'

export function useUsuariosActions() {
  const dispatch = useDispatch()

  const getRolesData = async () => dispatch(get_roles_data())
  const getRolePermissions = async id_rol => dispatch(get_role_permissions({ id_rol }))
  const getMappedRolePermissions = async id_rol => dispatch(get_mapped_role_permissions({ id_rol }))
  const switchRole = async data => dispatch(switch_state_role(data))
  const addRole = async data => dispatch(add_role(data))
  const updateRole = async data => dispatch(update_role(data))

  const setPermisosFiltered = async data => {
    dispatch(set_permisos_filtered({ data }))
  }

  const getPermisos = async revalidate => dispatch(get_permissions(revalidate))
  const deletePermission = async permission => dispatch(delete_permission({ permission }))
  const addPermission = async permission => dispatch(add_permission({ permission }))
  const switchPermissionState = async data => dispatch(switch_permission_state(data))

  const setUsuariosShowing = async usuario => dispatch(set_usuarios_showing({ usuario }))

  const createUsuario = async data => dispatch(create_user(data))
  const getCreateUsuarioParametros = async () => dispatch(get_usuarios_parametros())
  const searchUsuario = async data => dispatch(find_user(data))
  const updateUsuario = async data => dispatch(update_user(data))
  const deleteUsuario = async data => dispatch(delete_user(data))

  return {
    getRolesData,
    getRolePermissions,
    getMappedRolePermissions,
    getPermisos,
    addRole,
    updateRole,
    switchRole,
    setPermisosFiltered,
    deletePermission,
    addPermission,
    switchPermissionState,
    setUsuariosShowing,

    getCreateUsuarioParametros,
    createUsuario,
    searchUsuario,
    updateUsuario,
    deleteUsuario
  }
}
