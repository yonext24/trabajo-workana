import { CarreraSeeModal } from '@/components/modals/oferta-academica/carrera/carrera/carrera-see-modal'
import { CarreraUpdateModal } from '@/components/modals/oferta-academica/carrera/carrera/carrera-update-modal'
import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function CarreraCarreraTableRow({ permissions, carrera, nivel, estado }) {
  const { deleteCarreraCarrera } = useOfertaAcademicaActions()
  const { handleUpd, handleSee, handleDel } = useTableDefaultModals({
    update: { el: CarreraUpdateModal, nivel, carrera, estado },
    see: { el: CarreraSeeModal, nivel, carrera, estado },
    del: {
      onClick: () => {
        deleteCarreraCarrera(carrera)
      },
      sure: 'Realmente quieres borrar esta carrera?',
      title: 'Borrar carrera'
    },
    place: 'carrera-carrera'
  })

  const { UPDATE } = permissions
  const actions = [{ type: 'see', onClick: handleSee, text: 'Ver Carrera' }].concat(
    UPDATE
      ? [
          { type: 'delete', onClick: handleDel },
          { type: 'update', onClick: handleUpd }
        ]
      : []
  )

  return (
    <RowLayout>
      <td className="border-r">{carrera}</td>
      <td className="border-r">{nivel}</td>
      <td className="border-r">{estado}</td>
      <Row actions={actions} />
    </RowLayout>
  )
}
