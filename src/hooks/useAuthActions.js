import { logout } from '@/store/auth/slice'
import { checkSession, login, recover_password, revalidatePermissions } from '@/store/auth/thunks'
import { useDispatch } from 'react-redux'

export function useAuthActions() {
  const dispatch = useDispatch()

  const Login = async data => {
    return dispatch(login(data))
  }
  const Logout = () => {
    dispatch(logout())
  }
  const CheckSession = async () => {
    return dispatch(checkSession())
  }
  const RecoverPassword = async data => dispatch(recover_password(data))
  const RevalidatePermissions = async () => dispatch(revalidatePermissions())

  return { Login, Logout, CheckSession, RecoverPassword, RevalidatePermissions }
}
