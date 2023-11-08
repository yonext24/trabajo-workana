import { logout } from '@/store/auth/slice'
import {
  changePassword,
  checkSession,
  login,
  recoverPassword
} from '@/store/auth/thunks'
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
  const ChangePassword = async data => dispatch(changePassword(data))
  const RecoverPassword = async data => dispatch(recoverPassword(data))

  return { Login, Logout, CheckSession, ChangePassword, RecoverPassword }
}
