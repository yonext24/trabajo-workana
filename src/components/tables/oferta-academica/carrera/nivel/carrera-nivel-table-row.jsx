import { UpdateNivelModal } from '@/components/modals/oferta-academica/carrera/nivel/update-nivel-modal'
import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function CarreraNivelTableRow ({ nombre, descripcion }) {
  const { deleteCarreraNivel } = useOfertaAcademicaActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    place: 'nivel',
    update: { el: UpdateNivelModal, nombre, descripcion },
    del: { onClick: () => { deleteCarreraNivel(nombre) }, title: 'Borrar Nivel', sure: 'Realmente quieres borrar este nivel?' }
  })

  return <RowLayout>
    <td className="border-r">{nombre}</td>
    <td className="border-r">{descripcion}</td>
    <Row actions={[{ type: 'update', onClick: handleUpd }, { type: 'delete', onClick: handleDel }]} />

  </RowLayout>
}
