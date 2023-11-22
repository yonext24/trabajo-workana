import { CarreraSeeModal } from '@/components/modals/oferta-academica/carrera/carrera/carrera-see-modal'
import { CarreraUpdateModal } from '@/components/modals/oferta-academica/carrera/carrera/carrera-update-modal'
import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { parseEstado } from '@/utils/consts'

export function CarreraCarreraTableRow(props) {
  const { permissions, nombre, nivel, estado } = props

  const { handleUpd, handleSee } = useTableDefaultModals({
    update: { el: CarreraUpdateModal, ...props },
    see: { el: CarreraSeeModal, ...props },
    place: 'carrera'
  })

  const { UPDATE } = permissions
  const actions = [{ type: 'see', onClick: handleSee, text: 'Ver Carrera' }].concat(
    UPDATE ? [{ type: 'update', onClick: handleUpd }] : []
  )

  return (
    <RowLayout data-disabled={!estado}>
      <td className="border-r">{nivel}</td>
      <td className="border-r">{nombre}</td>
      <td className="border-r">{parseEstado(estado)}</td>
      <Row actions={actions} />
    </RowLayout>
  )
}
