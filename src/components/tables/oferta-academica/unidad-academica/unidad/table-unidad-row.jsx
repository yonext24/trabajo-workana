import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { UnidadUpdateModal } from '@/components/modals/oferta-academica/unidad-academica/unidad/unidad-update-modal'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { parseEstado } from '@/utils/consts'
import { useLayoutActions } from '@/hooks/useLayoutActions'
import { UnidadAddCarreraModal } from '@/components/modals/oferta-academica/unidad-academica/unidad/unidad-add-carrera-modal'
import { UnidadSeeCarrerasModal } from '@/components/modals/oferta-academica/unidad-academica/unidad/unidad-see-carreras-modal'
import { RowLayout } from '@/components/tables/row-layout'
import { Row } from '@/components/tables/row'

export function TableUnidadRow(props) {
  const { tipo_ua, nombre, abreviatura, id_unidad, codigo, permissions, estado } = props
  const { switchUnidadAcademicaUnidad } = useOfertaAcademicaActions()
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()
  const { handleUpd, handleSee } = useTableDefaultModals({
    place: 'unidad',
    update: { el: UnidadUpdateModal, ...props },
    see: { el: UnidadSeeCarrerasModal, ...props }
  })

  const handleDel = async () => switchUnidadAcademicaUnidad({ id_unidad, estado })

  const handleCarreraAdd = () => {
    const modalId = 'add-carrera-extension-modal'
    openModal({
      Element: UnidadAddCarreraModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        },
        ...props
      }
    })
  }

  const { UPDATE } = permissions

  const rows = [
    { id: 1, text: tipo_ua },
    { id: 2, text: codigo, className: '!text-center' },
    { id: 3, text: nombre, className: '' },
    { id: 4, text: abreviatura },
    { id: 5, text: parseEstado(estado) },
    { id: 7, carreras: UPDATE ? [{ type: 'add', onClick: handleCarreraAdd }] : [] },
    {
      id: 6,
      actions: [{ type: 'see', onClick: handleSee }].concat(
        UPDATE
          ? [
              { type: 'switch', onClick: handleDel, estado },
              { type: 'update', onClick: handleUpd }
            ]
          : []
      )
    }
  ]

  return (
    <RowLayout data-disabled={!estado}>
      {rows.map(el => (
        <Row key={el.id} {...el} />
      ))}
    </RowLayout>
  )
}
