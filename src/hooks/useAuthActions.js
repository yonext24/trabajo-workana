import { logout } from '@/store/auth/slice'
import { changePassword, checkSession, login } from '@/store/auth/thunks'
import { useDispatch } from 'react-redux'

export function useAuthActions () {
  const dispatch = useDispatch()

  const Login = async (data) => { return dispatch(login(data)) }
  const Logout = () => { dispatch(logout()) }
  const CheckSession = async () => { return dispatch(checkSession()) }
  const ChangePassword = async (data) => dispatch(changePassword(data))

  return { Login, Logout, CheckSession, ChangePassword }
}
