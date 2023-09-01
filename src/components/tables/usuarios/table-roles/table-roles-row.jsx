import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { Row } from '../../row'
import { RowLayout } from '../../row-layout'
import { RolePermissionsModal } from '@/components/modals/usuarios/roles/role-permissions-modal'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { UpdRolesModal } from '@/components/modals/usuarios/roles/upd-roles-modal'

export function TableRolesRow ({ nombre, descripcion }) {
  const { deleteRole } = useUsuariosActions()
  const { handleUpd, handleDel, handlePerm } = useTableDefaultModals({
    place: 'roles',
    perm: { el: RolePermissionsModal, nombre, descripcion },
    update: { el: UpdRolesModal, nombre, descripcion },
    del: {
      onClick: () => {
        deleteRole({ nombre })
      },
      title: 'Eliminar Rol',
      sure: 'Realmente quiere eliminar este rol?'
    }
  })

  const rows = [
    { id: 1, text: nombre },
    { id: 2, text: descripcion },
    {
      id: 3,
      actions: [
        { type: 'update', onClick: handleUpd },
        { type: 'delete', onClick: handleDel },
        { type: 'permisos', onClick: handlePerm }
      ]
    }
  ]

  return <RowLayout>
    {
      rows.map(el => <Row key={el.id} {...el} funcProps={{ role: { nombre, descripcion } }} ></Row>)
    }
  </RowLayout>
}
