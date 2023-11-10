import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { RowLayout } from '../../row-layout'
import { Row } from '../../row'
import { UnidadUpdateModal } from '@/components/modals/oferta-academica/unidad-academica/unidad-update-modal'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { parseEstado } from '@/utils/consts'

export function TableUnidadRow(props) {
  const { tipo_ua, nombre, abreviatura, id_unidad, codigo, permissions, estado } = props
  const { deleteUnidadAcademicaUnidad } = useOfertaAcademicaActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    place: 'unidad',
    update: { el: UnidadUpdateModal, ...props },
    del: {
      onClick: async () => deleteUnidadAcademicaUnidad(id_unidad),
      title: 'Desactivar Unidad',
      sure: 'Realmente quieres desactivar esta unidad?'
    }
  })

  const { UPDATE } = permissions

  const rows = [
    { id: 1, text: tipo_ua },
    { id: 2, text: codigo, className: '!text-center' },
    { id: 3, text: nombre, className: '' },
    { id: 4, text: abreviatura },
    { id: 5, text: parseEstado(estado) },
    {
      id: 6,
      actions: UPDATE
        ? [
            { type: 'update', onClick: handleUpd },
            { type: 'delete', onClick: handleDel }
          ]
        : []
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
