import { NuevoButton } from '@/components/common/nuevo-button'
import { AddPermisosModal } from '@/components/modals/usuarios/permisos/add-permisos-modal'
import { TablePermisos } from '@/components/tables/usuarios/table-permisos/table-permisos'
import { PermisosFilter } from '@/components/usuarios/permisos-filter'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect } from 'react'

export function Permisos () {
  const { getPermisosData } = useUsuariosActions()
  const { handleAdd } = useTableDefaultModals({ add: { el: AddPermisosModal }, place: 'permisos' })

  useEffect(() => { getPermisosData() }, [])
  const permissions = usePermissions({ nameOfModule: 'USUARIOS' })
  const { CREATE } = permissions

  return <div id='page-content'>
    <div className='w-full flex justify-between items-end'>
      <PermisosFilter />
      {
        CREATE &&
        <NuevoButton handleClick={handleAdd} />
      }
    </div>
    <TablePermisos permissions={permissions} columns={[{ text: 'Acciones' }]} />
  </div>
}
