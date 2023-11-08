import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { Row } from '../../row'
import { RowLayout } from '../../row-layout'
import { TipoUpdateModal } from '@/components/modals/oferta-academica/unidad-academica/tipo-update-modal'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { parseEstado } from '@/utils/consts'

export function TableTipoRow({
  permissions,
  nombre,
  descripcion,
  estado,
  id_tipo_ua
}) {
  const { UPDATE } = permissions

  const { deleteUnidadAcademicaTipos } = useOfertaAcademicaActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    del: {
      onClick: async () => deleteUnidadAcademicaTipos({ id_tipo_ua })
    },
    update: { el: TipoUpdateModal, nombre, descripcion, id_tipo_ua },
    place: 'tipo'
  })
  const rows = [
    { text: nombre },
    { text: descripcion },
    { text: parseEstado(estado), className: '!text-center' },
    {
      actions: UPDATE
        ? [
            { type: 'update', onClick: handleUpd },
            { type: 'delete', onClick: handleDel }
          ]
        : []
    }
  ]

  return (
    <RowLayout>
      {rows.map(el => (
        <Row key={el.text || el.actions} {...el} />
      ))}
    </RowLayout>
  )
}
