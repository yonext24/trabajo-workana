import { USER_POSSIBLE_STATES } from '@/store/auth/slice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function ProtectedRoute ({ children }) {
  const { logged, user } = useSelector(s => s.auth)

  console.log({ user })

  const navigate = useNavigate()

  if (logged === USER_POSSIBLE_STATES.NOT_LOGGED) {
    navigate('/login')
  }

  return children
}
