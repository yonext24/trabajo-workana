import { ErrorWarning } from '@/components/common/error-warning'
import { NuevoButton } from '@/components/common/nuevo-button'
import { AddPermisosModal } from '@/components/modals/usuarios/permisos/add-permisos-modal'
import { TablePermisos } from '@/components/tables/usuarios/table-permisos/table-permisos'
import { PermisosFilter } from '@/components/usuarios/permisos-filter'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useSelector } from 'react-redux'

export function Permisos() {
  const { handleAdd } = useTableDefaultModals({
    add: { el: AddPermisosModal },
    place: 'permisos'
  })

  const permissions = usePermissions({ nameOfModule: 'USUARIOS' })
  const { CREATE } = permissions
  const error = useSelector(s => s.usuarios.permisos.error)

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <PermisosFilter />
        <div className="flex items-end justify-end flex-1 gap-2">
          <ErrorWarning err={error} />
          <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
        </div>
      </div>
      <TablePermisos permissions={permissions} columns={[{ text: 'Acciones' }]} />
    </div>
  )
}
