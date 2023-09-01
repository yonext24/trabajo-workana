import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { Row } from '../../row'
import { RowLayout } from '../../row-layout'
import { ExtensionUpdateModal } from '@/components/modals/oferta-academica/extension/extension-update-modal'
import { ExtensionSeeModal } from '@/components/modals/oferta-academica/extension/extension-see-modal'
import { useLayoutActions } from '@/hooks/useLayoutActions'
import { ExtensionAddCarreraModal } from '@/components/modals/oferta-academica/extension/extension-add-carrera-modal'
import { ExtensionCarreraModal } from '@/components/modals/oferta-academica/extension/extension-carrera-modal'

export function ExtensionMainTableRow ({ ua, codigo, nombre, estado, fecha_de_creacion, abreviatura, ubicacion }) {
  const { handleUpd, handleDel, handleSee } = useTableDefaultModals({
    place: 'extension',
    update: { el: ExtensionUpdateModal, ua, codigo, nombre, estado, fecha_de_creacion, abreviatura, ubicacion },
    see: { el: ExtensionSeeModal, ua, codigo, nombre, estado, fecha_de_creacion, abreviatura, ubicacion }
  })
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const handleCarreraAdd = () => {
    const modalId = 'add-carrera-extension-modal'
    openModal({
      Element: ExtensionAddCarreraModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        }
      }
    })
  }
  const handleCarreraUpd = () => {
    const modalId = 'carrera-extension-modal'
    openModal({
      Element: ExtensionCarreraModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        }
      }
    })
  }
  const rows = [
    { id: 1, text: ua },
    { id: 2, text: codigo },
    { id: 3, text: nombre },
    { id: 4, text: estado },
    {
      id: 5,
      carreras: [
        { type: 'add', onClick: handleCarreraUpd },
        { type: 'see', onClick: handleCarreraAdd }
      ]
    },
    {
      id: 6,
      actions: [
        { type: 'see', onClick: handleSee },
        { type: 'update', onClick: handleUpd },
        { type: 'delete', onClick: handleDel }
      ]
    }
  ]
  return <RowLayout>
    {
      rows.map(el => <Row key={el.id} {...el}></Row>)
    }
  </RowLayout>
}
