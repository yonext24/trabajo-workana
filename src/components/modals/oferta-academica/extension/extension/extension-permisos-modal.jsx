import { InputWLabel } from '@/components/common/input-w-label'
import { UpdateExtensionCarreraButton } from '@/components/common/table-buttons'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { PermisoExtensionSeeModalTable } from '@/components/tables/oferta-academica/extension/permiso/permiso-extension-see-modal-table'
import { useLayoutActions } from '@/hooks/useLayoutActions'
import { extension } from '@/utils/routes'
import { useCallback, useEffect, useState } from 'react'
import { ExtensionUpdatePermisosModal } from './extension-update-permisos-modal'

export function ExtensionPermisosModal(props) {
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [data, setData] = useState([])

  const { closeModal, unidad, nombre, id_extension } = props

  const { openModal, closeModal: closeModalFunc } = useLayoutActions(s => s.layout)

  const fetchPermisos = useCallback(() => {
    setStatus({ type: 'loading' })
    extension
      .get_permisos({ id_extension })
      .then(res => {
        setData(res)
        setStatus({ type: 'success' })
      })
      .catch(err => {
        setStatus({ type: 'error', message: err?.message ?? 'Algo salió mal' })
      })
  }, [setStatus, setData])

  const handleUpdate = useCallback(() => {
    const id = 'update-permisos-extension-modal'
    openModal({
      Element: ExtensionUpdatePermisosModal,
      id,
      props: {
        ...props,
        closeModal: () => {
          closeModalFunc(id)
        },
        fetchPermisos
      }
    })
  }, [])

  useEffect(() => {
    fetchPermisos()
  }, [])

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout
        className={'!max-w-[850px] w-full overflow-hidden'}
        title="Permisos de extensión"
        closeModal={closeModal}
      >
        <div className="w-full flex flex-col gap-4 p-4">
          <div className="flex gap-4 w-full [&>*]:flex-1">
            <InputWLabel disabled value={unidad} name="Unidad académica" />
            <InputWLabel disabled value={nombre} name="Extensión" />
          </div>
          <div className="flex gap-4">
            <h4 className="text-2xl">Permisos de extensión</h4>
            <UpdateExtensionCarreraButton handleClick={handleUpdate} text="Actualizar Permisos" />
          </div>
          <PermisoExtensionSeeModalTable
            id_extension={id_extension}
            data={data}
            loading={status.type === 'loading'}
            error={status.type === 'error' && status.message}
          />
        </div>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
