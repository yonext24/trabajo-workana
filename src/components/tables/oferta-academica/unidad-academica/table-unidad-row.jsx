import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { RowLayout } from '../../row-layout'
import { Row } from '../../row'
import { UnidadUpdateModal } from '@/components/modals/oferta-academica/unidad-academica/unidad-update-modal'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'

export function TableUnidadRow ({ tipo, nombre, abreviatura, codigo }) {
  const { deleteUnidadAcademicaUnidad } = useOfertaAcademicaActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    place: 'unidad',
    update: { el: UnidadUpdateModal, tipo, nombre, abreviatura, codigo },
    del: { onClick: () => { deleteUnidadAcademicaUnidad(nombre) }, title: 'Borrar Unidad', sure: 'Realmente quieres borrar esta unidad?' }
  })

  const rows = [
    { id: 1, text: tipo },
    { id: 2, text: codigo, className: 'text-center' },
    { id: 3, text: nombre, className: 'text-center' },
    { id: 4, text: abreviatura },
    {
      id: 5,
      actions: [
        { type: 'update', onClick: handleUpd },
        { type: 'delete', onClick: handleDel }
      ]
    }
  ]

  return <RowLayout>
    {
      rows.map(el => <Row key={el.id} {...el} />)
    }
  </RowLayout>
}
