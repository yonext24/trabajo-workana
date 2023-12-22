import { PermisoExtensionUpdateModal } from '@/components/modals/oferta-academica/extension/permiso/permiso-extension-update-modal'
import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { parseEstado } from '@/utils/consts'

export function PermisoExtensionMainTableRow(props) {
  const { permissions, nombre, descripcion, estado, id_permiso } = props
  const { UPDATE } = permissions

  const { handleUpd } = useTableDefaultModals({
    place: 'permiso-ext',
    update: {
      el: PermisoExtensionUpdateModal,
      ...props
    }
  })

  const { switchOfertaAcademicaPermiso } = useOfertaAcademicaActions()

  const rows = [
    { id: 1, text: nombre },
    { id: 2, text: descripcion },
    { id: 3, text: parseEstado(estado), className: '!text-center' },
    {
      id: 4,
      actions: UPDATE
        ? [
            {
              type: 'switch',
              onClick: async () => switchOfertaAcademicaPermiso({ id_permiso, estado }),
              estado
            },
            {
              type: 'update',
              onClick: handleUpd
            }
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
