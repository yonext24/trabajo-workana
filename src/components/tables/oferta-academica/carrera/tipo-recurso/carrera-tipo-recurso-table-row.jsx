import { UpdateTipoRecursoModal } from '@/components/modals/oferta-academica/carrera/tipo-recurso/tipo-recurso-update-modal'
import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { parseEstado } from '@/utils/consts'

export function CarreraTipoRecursoTableRow(props) {
  const { nombre, descripcion, permissions, id_tipo_recurso, estado } = props

  const { switchCarreraTipoRecurso } = useOfertaAcademicaActions()
  const { handleUpd } = useTableDefaultModals({
    place: 'nivel',
    update: { el: UpdateTipoRecursoModal, ...props }
  })

  const handleDel = async () => switchCarreraTipoRecurso({ id_tipo_recurso, estado })

  const { UPDATE } = permissions
  const actions = UPDATE
    ? [
        { type: 'switch', onClick: handleDel, estado },
        { type: 'update', onClick: handleUpd }
      ]
    : []

  return (
    <RowLayout data-disabled={!estado}>
      <td className="border-r">{nombre}</td>
      <td className="border-r">{descripcion}</td>
      <td className="border-r !text-center">{parseEstado(estado)}</td>
      <Row actions={actions} />
    </RowLayout>
  )
}
