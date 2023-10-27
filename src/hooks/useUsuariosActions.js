import {
  set_permisos_filtered,
  set_usuarios_showing
} from '@/store/usuarios/slice'
import {
  add_permission,
  add_role,
  delete_permission,
  delete_role,
  get_permissions,
  get_role_permissions,
  get_roles_data,
  switch_permission_state
} from '@/store/usuarios/thunks'
import { useDispatch } from 'react-redux'

export function useUsuariosActions() {
  const dispatch = useDispatch()

  const getRolesData = async () => dispatch(get_roles_data())
  const getRolePermissions = async id_rol =>
    dispatch(get_role_permissions({ id_rol }))
  const deleteRole = async ({ nombre }) => dispatch(delete_role(nombre))
  const addRole = async data => dispatch(add_role(data))

  const setPermisosFiltered = async data =>
    dispatch(set_permisos_filtered({ data }))
  const getPermisos = async revalidate => dispatch(get_permissions(revalidate))
  const deletePermission = async permission =>
    dispatch(delete_permission({ permission }))
  const addPermission = async permission =>
    dispatch(add_permission({ permission }))
  const switchPermissionState = async data =>
    dispatch(switch_permission_state(data))

  const setUsuariosShowing = async usuario =>
    dispatch(set_usuarios_showing({ usuario }))

  return {
    getRolesData,
    getRolePermissions,
    getPermisos,
    addRole,
    deleteRole,
    setPermisosFiltered,
    deletePermission,
    addPermission,
    switchPermissionState,
    setUsuariosShowing
  }
}
