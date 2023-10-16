import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { Row } from '../../row'
import { RowLayout } from '../../row-layout'
import { TipoUpdateModal } from '@/components/modals/oferta-academica/unidad-academica/tipo-update-modal'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'

export function TableTipoRow ({ permissions, nombre, descripcion }) {
  const { UPDATE } = permissions

  const { deleteUnidadAcademicaTipos } = useOfertaAcademicaActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    del: {
      onClick: () => {
        deleteUnidadAcademicaTipos(nombre)
      },
      title: 'Desactivar Tipo',
      sure: 'Realmente quiere desactivar este tipo?'
    },
    update: { el: TipoUpdateModal, nombre, descripcion },
    place: 'tipo'
  })
  const rows = [
    { text: nombre },
    { text: descripcion },
    {
      actions:
      UPDATE
        ? [
            { type: 'update', onClick: handleUpd },
            { type: 'delete', onClick: handleDel }
          ]
        : []
    }
  ]

  return <RowLayout>
    {
      rows.map(el => <Row key={el.text || el.actions} {...el} />)
    }
  </RowLayout>
}
