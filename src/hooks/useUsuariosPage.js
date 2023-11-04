import { AddUsuariosModal } from '@/components/modals/usuarios/usuarios/add-usuarios-modal'
import { ChangeRoleModal } from '@/components/modals/usuarios/usuarios/change-role-modal'
import { InfoUsuariosModal } from '@/components/modals/usuarios/usuarios/info-usuarios-modal'
import { UpdateUsuariosModal } from '@/components/modals/usuarios/usuarios/update-usuarios-modal'
import { useLayoutActions } from '@/hooks/useLayoutActions'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useFormCustom } from './useFormCustom'

export const useUsuariosPage = () => {
  const [searchFor, setSearchFor] = useState('correo')
  const { register, handleSubmit } = useForm()
  const { handleLoading } = useFormCustom()
  const { searchUsuario, deleteUsuario } = useUsuariosActions()

  const usuariosData = useSelector(s => s.usuarios.usuarios.data)
  const usuariosLoading = useSelector(s => s.usuarios.usuarios.loading)
  const showing = useSelector(s => s.usuarios.usuarios.showing)

  const { handleAdd, handleUpd, handleDel } = useTableDefaultModals({
    place: 'usuarios',
    add: { el: AddUsuariosModal },
    update: { el: UpdateUsuariosModal },
    del: {
      onClick: async () => {
        const res = await deleteUsuario({ usuario: showing.usuario })
        if (!res.error) {
          toast.success('Usuario desactivado con éxito')
        }
      },
      title: 'Desactivar usuario',
      sure: 'Realmente quieres desactivar este usuario?'
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

  const onSubmit = handleLoading(async data => {
    const { search } = data

    const res = await searchUsuario({ [searchFor]: search })
    console.log(res)
  })

  const canShow = Object.entries(showing).length > 0

  return {
    onSubmit,
    handleRole,
    handleInfo,
    handleDel,
    handleUpd,
    handleAdd,
    register,
    handleSubmit,
    setSearchFor,
    searchFor,
    usuariosLoading,
    usuariosData,
    CREATE,
    UPDATE,
    canShow
  }
}
