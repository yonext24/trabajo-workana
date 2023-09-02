import { logout } from '@/store/auth/slice'
import { checkSession, login } from '@/store/auth/thunks'
import { useDispatch } from 'react-redux'

export function useAuthActions () {
  const dispatch = useDispatch()

  const Login = async (data) => { return dispatch(login(data)) }
  const Logout = () => { dispatch(logout()) }
  const CheckSession = async () => { return dispatch(checkSession()) }

  return { Login, Logout, CheckSession }
}
