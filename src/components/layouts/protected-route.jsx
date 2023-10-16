import { USER_POSSIBLE_STATES } from '@/store/auth/slice'
import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Spinner } from '../common/spinner'
import { checkPermissions } from '@/utils/checkPermissions'

export function ProtectedRoute ({ children, name, isProfile, parsedName }) {
  const [isChecking, setIsChecking] = useState(true)

  const { logged, permissions, operacion } = useSelector(s => s.auth)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (logged === USER_POSSIBLE_STATES.NOT_KNOWN) {
      return
    }
    if (logged === USER_POSSIBLE_STATES.NOT_LOGGED) {
      console.log('not logged')
      navigate('/login')
      return
    }
    if (isProfile) {
      setIsChecking(false)
      return
    }

    setIsChecking(true)

    const read = operacion.read
    const hasPermission = checkPermissions({ operacion: read, permissions, nameOfModule: name })

    if (hasPermission) {
      setIsChecking(false)
      return
    }

    toast.error(`No tienes permisos de lectura para acceder a esta ruta: ${parsedName}`, { toastId: pathname })
    navigate('/perfil')
  }, [pathname, logged])

  if (isChecking) {
    return <div className='h-full w-full flex justify-center items-center bg-white text-black rounded-2xl|'>
    <Spinner />
  </div>
  }

  return children
}
