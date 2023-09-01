import { NuevoButton } from '../../components/common/nuevo-button'
import { useTableDefaultModals } from '../../hooks/useTableDefaultModals'
import { AddRolesModal } from '@/components/modals/usuarios/roles/add-roles-modal'
import { TableRoles } from '@/components/tables/usuarios/table-roles/table-roles'
import { useEffect } from 'react'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'

// Esta página y todas las de la carpeta /usuarios tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Roles () {
  const { handleAdd } = useTableDefaultModals({ add: { el: AddRolesModal }, place: 'roles' })
  const { getRolesData, getPermisosData } = useUsuariosActions()

  useEffect(() => {
    getRolesData()
    getPermisosData()
  }, [])

  return <div id='page-content'>
    <NuevoButton handleClick={handleAdd} />
    <TableRoles />
  </div>
}
