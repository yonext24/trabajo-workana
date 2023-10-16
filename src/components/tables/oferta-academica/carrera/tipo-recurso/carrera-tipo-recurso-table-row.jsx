import { UpdateTipoRecursoModal } from '@/components/modals/oferta-academica/carrera/tipo-recurso/tipo-recurso-update-modal'
import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function CarreraTipoRecursoTableRow ({ nombre, descripcion, permissions }) {
  const { deleteCarreraTipoRecurso } = useOfertaAcademicaActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    place: 'nivel',
    update: { el: UpdateTipoRecursoModal, nombre, descripcion },
    del: {
      onClick: () => deleteCarreraTipoRecurso(nombre),
      title: 'Desactivar Tipo de recurso',
      sure: 'Realmente quieres desactivar este tipo de recurso?'
    }
  })

  const { UPDATE } = permissions
  const actions = UPDATE ? [{ type: 'update', onClick: handleUpd }, { type: 'delete', onClick: handleDel }] : []

  return <RowLayout>
    <td className="border-r">{nombre}</td>
    <td className="border-r">{descripcion}</td>
    <Row actions={actions} />

  </RowLayout>
}
