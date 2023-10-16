import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { RowLayout } from '../../row-layout'
import { Row } from '../../row'
import { UpdPermisosModal } from '@/components/modals/usuarios/permisos/upd-permisos-modal'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'

export function TablePermisosRow ({ modulo, operacion, unidad, extension, nivel, id, withActions = true, selectFunction, permissions }) {
  const { deletePermission } = useUsuariosActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    place: 'roles',
    update: {
      el: UpdPermisosModal,
      modulo,
      operacion,
      unidad,
      extension,
      nivel,
      id
    },
    del: {
      onClick: () => {
        deletePermission({ id })
      },
      title: 'Desactivar Permiso',
      sure: 'Realmente quiere desactivar este permiso?'
    }
  })

  const { UPDATE } = permissions

  const toConcat = withActions
    ? [
        {
          actions: UPDATE
            ? [
                { type: 'update', onClick: handleUpd },
                { type: 'delete', onClick: handleDel }
              ]
            : []
        }
      ]
    : []

  const rows = [
    { text: modulo },
    { text: operacion },
    { text: unidad },
    { text: extension },
    { text: nivel }
  ].concat(toConcat)

  return <RowLayout>
    {
      rows.map(el => <Row key={el.text || el.actions} {...el}></Row>)
    }
    {
      selectFunction && <td>
        <div className='flex justify-center'>
          <input type='checkbox' />
        </div>
      </td>
    }
  </RowLayout>
}
