import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

const INITIAL_STATE = {
  READ: false,
  CREATE: false,
  UPDATE: false,
  DELETE: false
}

export function usePermissions ({ nameOfModule }) {
  const [userPermissions, setUserPermissions] = useState(INITIAL_STATE)

  const permissions = useSelector(state => state.auth.permissions)
  const operaciones = useSelector(state => state.auth.operacion)

  useEffect(() => {
    if (!permissions || !operaciones) return
    const permissionsOfModule = permissions.filter(permission => permission.nombre === nameOfModule)

    if (permissionsOfModule) {
      const finalPermissions = {}

      Object.entries(operaciones).forEach(([operation, value]) => {
        finalPermissions[operation.toUpperCase()] = permissionsOfModule.some(permission => permission.operacion === value)
      })

      setUserPermissions(prev => ({ ...prev, ...finalPermissions }))
    }
  }, [nameOfModule, permissions, operaciones])

  return userPermissions
}
