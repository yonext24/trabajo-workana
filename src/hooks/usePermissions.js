import { INITIAL_PERMISSIONS_STATE } from '@/store/auth/thunks'
import { useSelector } from 'react-redux'

export function usePermissions({ nameOfModule }) {
  const permissions = useSelector(state => state.auth.permissions)
  const sectorPermissions = permissions?.[nameOfModule] ?? INITIAL_PERMISSIONS_STATE

  return sectorPermissions
}
