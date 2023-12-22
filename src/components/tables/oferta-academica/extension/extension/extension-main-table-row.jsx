import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { Row } from '../../../row'
import { RowLayout } from '../../../row-layout'
import { ExtensionUpdateModal } from '@/components/modals/oferta-academica/extension/extension/extension-update-modal'
import { ExtensionSeeModal } from '@/components/modals/oferta-academica/extension/extension/extension-see-modal'
import { useLayoutActions } from '@/hooks/useLayoutActions'
import { ExtensionAddCarreraModal } from '@/components/modals/oferta-academica/extension/extension/extension-add-carrera-modal'
import { parseEstado } from '@/utils/consts'

export function ExtensionMainTableRow(props) {
  const { permissions, unidad, codigo, nombre, estado } = props

  const { handleUpd, handleSee } = useTableDefaultModals({
    place: 'extension',
    update: {
      el: ExtensionUpdateModal,
      ...props
    },
    see: {
      el: ExtensionSeeModal,
      ...props
    }
  })
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const { UPDATE } = permissions

  const handleCarreraAdd = () => {
    const modalId = 'add-carrera-extension-modal'
    openModal({
      Element: ExtensionAddCarreraModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        },
        ...props
      }
    })
  }
  const rows = [
    { id: 1, text: unidad },
    { id: 2, text: codigo, className: '!text-center' },
    { id: 3, text: nombre },
    { id: 4, text: parseEstado(estado) },
    {
      id: 5,
      carreras: UPDATE ? [{ type: 'add', onClick: handleCarreraAdd }] : []
    },
    {
      id: 6,
      actions: [{ type: 'see', onClick: handleSee }].concat(UPDATE ? [{ type: 'update', onClick: handleUpd }] : [])
    }
  ]
  return (
    <RowLayout data-disabled={!estado}>
      {rows.map(el => (
        <Row key={el.id} {...el}></Row>
      ))}
    </RowLayout>
  )
}
