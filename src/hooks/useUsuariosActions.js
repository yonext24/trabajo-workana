import { get_roles_data } from '@/store/usuarios/slice'
import { useDispatch } from 'react-redux'
export function useUsuariosActions () {
  const dispatch = useDispatch()

  const getRolesData = async () => { dispatch(get_roles_data()) }

  return { getRolesData }
}
