import { UpdateNivelModal } from '@/components/modals/oferta-academica/carrera/nivel/update-nivel-modal'
import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { parseEstado } from '@/utils/consts'

export function CarreraNivelTableRow(props) {
  const { nombre, descripcion, estado, id_nivel, permissions } = props

  const { switchCarreraNivel } = useOfertaAcademicaActions()
  const { handleUpd } = useTableDefaultModals({
    place: 'nivel',
    update: { el: UpdateNivelModal, ...props }
  })

  const handleDel = async () => switchCarreraNivel({ id_nivel, estado })

  const { UPDATE } = permissions
  const actions = UPDATE
    ? [
        { type: 'update', onClick: handleUpd },
        { type: 'switch', onClick: handleDel, estado }
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
