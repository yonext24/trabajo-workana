import { RecursoUpdateModal } from '@/components/modals/oferta-academica/carrera/recurso/recurso-update-modal'
import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function RecursoTableRow ({ tipo, nombre, descripcion }) {
  const { deleteCarreraRecurso } = useOfertaAcademicaActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    place: 'nivel',
    update: { el: RecursoUpdateModal, nombre, descripcion, tipo },
    del: { onClick: () => { deleteCarreraRecurso(nombre) }, title: 'Borrar Recurso', sure: 'Realmente quieres borrar este recurso?' }
  })

  return <RowLayout>
    <td className="border-r">{tipo}</td>
    <td className="border-r">{nombre}</td>
    <td className="border-r">{descripcion}</td>
    <Row actions={[{ type: 'update', onClick: handleUpd }, { type: 'delete', onClick: handleDel }]} />
  </RowLayout>
}
