import { UpdateTipoRecursoModal } from '@/components/modals/oferta-academica/carrera/tipo-recurso/tipo-recurso-update-modal'
import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function CarreraTipoRecursoTableRow ({ nombre, descripcion }) {
  const { deleteCarreraTipoRecurso } = useOfertaAcademicaActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    place: 'nivel',
    update: { el: UpdateTipoRecursoModal, nombre, descripcion },
    del: {
      onClick: () => deleteCarreraTipoRecurso(nombre),
      title: 'Borrar Tipo de recurso',
      sure: 'Realmente quieres borrar este tipo de recurso?'
    }
  })

  return <RowLayout>
    <td className="border-r">{nombre}</td>
    <td className="border-r">{descripcion}</td>
    <Row actions={[{ type: 'update', onClick: handleUpd }, { type: 'delete', onClick: handleDel }]} />

  </RowLayout>
}
