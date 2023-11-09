import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { Row } from '../../row'
import { RowLayout } from '../../row-layout'
import { RolePermissionsModal } from '@/components/modals/usuarios/roles/role-permissions-modal'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { UpdRolesModal } from '@/components/modals/usuarios/roles/upd-roles-modal'
import { parseEstado } from '@/utils/consts'

export function TableRolesRow({
  nombre,
  descripcion,
  estado,
  id_rol,
  permissions
}) {
  const { deleteRole } = useUsuariosActions()
  const { handleUpd, handleDel, handlePerm } = useTableDefaultModals({
    place: 'roles',
    perm: { el: RolePermissionsModal, nombre, descripcion, estado, id_rol },
    update: {
      el: UpdRolesModal,
      id_rol,
      nombre,
      estado,
      descripcion
    },
    del: {
      onClick: async () => await deleteRole(id_rol),
      title: 'Desactivar Rol',
      sure: 'Realmente quiere desactivar este rol?'
    }
  })

  const { UPDATE } = permissions

  const rows = [
    { id: 1, text: nombre },
    { id: 2, text: descripcion },
    { id: 3, text: parseEstado(estado), className: '!text-center' },
    {
      id: 4,
      actions: UPDATE
        ? [
            { type: 'update', onClick: handleUpd },
            { type: 'delete', onClick: handleDel },
            { type: 'permisos', onClick: handlePerm }
          ]
        : []
    }
  ]

  return (
    <RowLayout data-disabled={!estado}>
      {rows.map(el => (
        <Row
          key={el.id}
          {...el}
          funcProps={{ role: { nombre, descripcion } }}
        ></Row>
      ))}
    </RowLayout>
  )
}
