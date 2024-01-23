import { AddUsuariosModal } from '@/components/modals/usuarios/usuarios/add-usuarios-modal'
import { ChangeRoleModal } from '@/components/modals/usuarios/usuarios/change-role-modal'
import { InfoUsuariosModal } from '@/components/modals/usuarios/usuarios/info-usuarios-modal'
import { UpdateUsuariosModal } from '@/components/modals/usuarios/usuarios/update-usuarios-modal'
import { useLayoutActions } from '@/hooks/useLayoutActions'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useUsuariosPage = () => {
  const { deleteUsuario, resetShowing } = useUsuariosActions()

  const usuariosData = useSelector(s => s.usuarios.usuarios.data)
  const usuariosLoading = useSelector(s => s.usuarios.usuarios.loading)
  const showing = useSelector(s => s.usuarios.usuarios.showing)

  const { handleAdd, handleUpd, handleDel } = useTableDefaultModals({
    place: 'usuarios',
    add: { el: AddUsuariosModal },
    update: { el: UpdateUsuariosModal },
    del: {
      onClick: async () => {
        const res = await deleteUsuario({ usuario: showing?.otros?.id_rol_usuario })
        if (!res.error) {
          toast.success('Usuario desactivado con éxito')
        }
      },
      title: 'Dar de baja usuario',
      sure: 'Realmente quieres dar de baja este usuario?',
      button: 'Dar de baja'
    }
  })

  const { openModal, closeModal: closeModalFunc } = useLayoutActions()
  const { CREATE, UPDATE } = usePermissions({ nameOfModule: 'USUARIOS' })

  const handleInfo = () => {
    const modalId = 'info-usuarios-modal'
    openModal({
      Element: InfoUsuariosModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        }
      }
    })
  }
  const handleRole = () => {
    const modalId = 'role-usuarios-modal'
    openModal({
      Element: ChangeRoleModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        }
      }
    })
  }

  const canShow = Object.entries(showing).length > 0

  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.pathname !== '/usuarios/usuarios') resetShowing()
  }, [pathname])

  return {
    handleRole,
    handleInfo,
    handleDel,
    handleUpd,
    handleAdd,
    usuariosLoading,
    usuariosData,
    CREATE,
    UPDATE,
    canShow
  }
}
