import { useEffect } from 'react'
import { useAuthActions } from './useAuthActions'
import { useSelector } from 'react-redux'
import { useLayoutActions } from './useLayoutActions'
import { ChangePasswordModal } from '@/components/modals/login/change-password-modal'

export function useAuth () {
  const { CheckSession } = useAuthActions()
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const logged = useSelector(s => s.auth.logged)
  const user = useSelector(s => s.auth.user)

  useEffect(() => {
    CheckSession()
  }, [])

  useEffect(() => {
    if (!logged) return

    if (user?.temporal) {
      const id = 'change-password-modal'
      openModal({
        Element: ChangePasswordModal,
        id,
        props: {
          closeModal: () => {
            closeModalFunc(id)
          }
        }
      })
    }
  }, [logged])
}
