import { USER_POSSIBLE_STATES } from '@/store/auth/slice'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Spinner } from '../common/spinner'
import { usePermissions } from '@/hooks/usePermissions'

export function ProtectedRoute({ children, name, isProfile, parsedName }) {
  const [isChecking, setIsChecking] = useState(true)

  const logged = useSelector(s => s.auth.logged)
  const { READ } = usePermissions({ nameOfModule: name })

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (logged === USER_POSSIBLE_STATES.NOT_KNOWN) {
      return
    }
    if (logged === USER_POSSIBLE_STATES.NOT_LOGGED) {
      navigate('/login')
      return
    }
    if (isProfile) {
      setIsChecking(false)
      return
    }

    setIsChecking(true)

    const hasPermission = READ

    if (hasPermission) {
      setIsChecking(false)
      return
    }

    toast.error(`No tienes permisos de lectura para acceder a esta ruta: ${parsedName}`, { toastId: pathname })
    navigate('/perfil')
  }, [pathname, logged])

  if (isChecking) {
    return (
      <div className="h-full w-full flex justify-center items-center bg-white text-black rounded-2xl|">
        <Spinner />
      </div>
    )
  }

  return children
}
