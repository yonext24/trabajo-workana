import { RecursoUpdateModal } from '@/components/modals/oferta-academica/carrera/recurso/recurso-update-modal'
import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function RecursoTableRow({ tipo, nombre, descripcion, permissions }) {
  const { deleteCarreraRecurso } = useOfertaAcademicaActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    place: 'recurso',
    update: { el: RecursoUpdateModal, nombre, descripcion, tipo },
    del: {
      onClick: () => {
        deleteCarreraRecurso(nombre)
      }
    }
  })

  const { UPDATE } = permissions
  const actions = UPDATE
    ? [
        { type: 'update', onClick: handleUpd },
        { type: 'delete', onClick: handleDel }
      ]
    : []

  return (
    <RowLayout>
      <td className="border-r">{tipo}</td>
      <td className="border-r">{nombre}</td>
      <td className="border-r">{descripcion}</td>
      <Row actions={actions} />
    </RowLayout>
  )
}
