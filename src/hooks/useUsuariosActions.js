import { get_permisos_data, get_role_permissions, get_roles_data, set_permisos_filtered, set_usuarios_showing } from '@/store/usuarios/slice'
import { add_role, delete_role, add_permission, delete_permission, update_permission } from '@/store/usuarios/thunks'
import { useDispatch } from 'react-redux'
export function useUsuariosActions () {
  const dispatch = useDispatch()

  const getRolesData = async () => { dispatch(get_roles_data()) }
  const getRolePermissions = async (role) => { dispatch(get_role_permissions({ role })) }
  const getPermisosData = async (revalidate) => { dispatch(get_permisos_data(revalidate)) }

  const setPermisosFiltered = async (data) => { dispatch(set_permisos_filtered({ data })) }
  const setUsuariosShowing = async (usuario) => { dispatch(set_usuarios_showing({ usuario })) }

  const deleteRole = async ({ nombre }) => { dispatch(delete_role({ nombre })) }
  const addRole = async (role) => { dispatch(add_role({ role })) }

  const deletePermission = async (permission) => { dispatch(delete_permission({ permission })) }
  const addPermission = async (permission) => dispatch(add_permission({ permission }))
  const updatePermission = async (permission) => dispatch(update_permission({ permission }))

  return {
    getRolesData,
    getRolePermissions,
    getPermisosData,
    addRole,
    deleteRole,
    setPermisosFiltered,
    deletePermission,
    addPermission,
    updatePermission,
    setUsuariosShowing
  }
}
