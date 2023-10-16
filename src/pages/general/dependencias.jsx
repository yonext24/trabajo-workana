import { useSelector } from 'react-redux'
import { TableDependencias } from '../../components/tables/general/table-dependencias/table-dependencias'
import { NuevoButton } from '../../components/common/nuevo-button'
import { Filter } from '../../components/general/filter'
import { DependenciasAddModal } from '../../components/modals/general/dependencias/dependencias-add-modal'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Dependencias () {
  const { general: { dependencias: { data: { filtered } } } } = useSelector(s => s.data)

  const permissions = usePermissions({ nameOfModule: 'GENERAL' })
  const { CREATE } = permissions

  const { handleAdd } = useTableDefaultModals({ place: 'dependencias', add: { el: DependenciasAddModal } })

  return <div id='page-content'>
    <div className="w-full flex justify-between items-end">

      <Filter />

      {
        CREATE && <NuevoButton handleClick={handleAdd} />
      }

    </div>
    <TableDependencias data={filtered} permissions={permissions} />
  </div>
}
