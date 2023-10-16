import { UpdateNivelModal } from '@/components/modals/oferta-academica/carrera/nivel/update-nivel-modal'
import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function CarreraNivelTableRow ({ nombre, descripcion, permissions }) {
  const { deleteCarreraNivel } = useOfertaAcademicaActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    place: 'nivel',
    update: { el: UpdateNivelModal, nombre, descripcion },
    del: { onClick: () => { deleteCarreraNivel(nombre) }, title: 'Desactivar Nivel', sure: 'Realmente quieres desactivar este nivel?' }
  })

  const { UPDATE } = permissions
  const actions = UPDATE ? [{ type: 'update', onClick: handleUpd }, { type: 'delete', onClick: handleDel }] : []

  return <RowLayout>
    <td className="border-r">{nombre}</td>
    <td className="border-r">{descripcion}</td>
    <Row actions={actions} />

  </RowLayout>
}
