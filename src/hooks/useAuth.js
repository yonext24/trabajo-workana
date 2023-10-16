import { useEffect } from 'react'
import { useAuthActions } from './useAuthActions'

export function useAuth () {
  const { CheckSession } = useAuthActions()

  useEffect(() => {
    CheckSession()
  }, [])
}
