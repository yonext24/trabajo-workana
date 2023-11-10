import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { Row } from '../../row'
import { RowLayout } from '../../row-layout'
import { TipoUpdateModal } from '@/components/modals/oferta-academica/unidad-academica/tipo-update-modal'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { parseEstado } from '@/utils/consts'

export function TableTipoRow({ permissions, nombre, descripcion, estado, id_tipo_ua }) {
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
    { id: 1, text: nombre },
    { id: 2, text: descripcion },
    { id: 3, text: parseEstado(estado), className: '!text-center' },
    {
      id: 4,
      actions: UPDATE
        ? [
            { type: 'update', onClick: handleUpd },
            { type: 'delete', onClick: handleDel }
          ]
        : []
    }
  ]

  return (
    <RowLayout data-disabled={!estado}>
      {rows.map(el => (
        <Row key={el.id} {...el} />
      ))}
    </RowLayout>
  )
}
