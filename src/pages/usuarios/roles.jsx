import { useSelector } from 'react-redux'
import { NuevoButton } from '../../components/common/nuevo-button'
import { useTableDefaultModals } from '../../hooks/useTableDefaultModals'
import { AddRolesModal } from '@/components/modals/usuarios/add-roles-modal'
import { TableRoles } from '@/components/tables/usuarios/table-roles/table-roles'
import { useEffect } from 'react'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'

// Esta página y todas las de la carpeta /usuarios tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Roles () {
  const { data } = useSelector(s => s.usuarios).roles
  const { handleAdd } = useTableDefaultModals({ add: { el: AddRolesModal }, place: 'roles' })
  const { getRolesData } = useUsuariosActions()

  useEffect(() => {
    getRolesData()
  }, [])

  return <div id='page-content'>
    <NuevoButton handleClick={handleAdd} />
    <TableRoles data={data} />
  </div>
}
