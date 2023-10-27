import { NuevoButton } from '../../components/common/nuevo-button'
import { useTableDefaultModals } from '../../hooks/useTableDefaultModals'
import { AddRolesModal } from '@/components/modals/usuarios/roles/add-roles-modal'
import { TableRoles } from '@/components/tables/usuarios/table-roles/table-roles'
import { useEffect } from 'react'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { usePermissions } from '@/hooks/usePermissions'
import { useSelector } from 'react-redux'
import { ErrorWarning } from '@/components/common/error-warning'

// Esta página y todas las de la carpeta /usuarios tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Roles() {
  const { handleAdd } = useTableDefaultModals({
    add: { el: AddRolesModal },
    place: 'roles'
  })
  const { getPermisos } = useUsuariosActions()

  const permissions = usePermissions({ nameOfModule: 'USUARIOS' })
  const { CREATE } = permissions

  const error = useSelector(s => s.usuarios.roles.error)

  useEffect(() => {
    getPermisos()
  }, [])

  return (
    <div id="page-content">
      <div className="flex justify-between">
        <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
        <ErrorWarning err={error} />
      </div>

      <TableRoles permissions={permissions} />
    </div>
  )
}
