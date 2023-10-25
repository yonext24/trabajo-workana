import { TableDependencias } from '../../components/tables/general/table-dependencias/table-dependencias'
import { NuevoButton } from '../../components/common/nuevo-button'
import { Filter } from '../../components/general/filter'
import { DependenciasAddModal } from '../../components/modals/general/dependencias/dependencias-add-modal'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useSelector } from 'react-redux'
import { ErrorWarning } from '@/components/common/error-warning'

// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Dependencias () {
  const permissions = usePermissions({ nameOfModule: 'GENERAL' })
  const { CREATE } = permissions

  const { handleAdd } = useTableDefaultModals({ place: 'dependencias', add: { el: DependenciasAddModal } })
  const error = useSelector(s => s.data.dependencias.error)

  return <div id='page-content'>
    <div className="w-full flex flex-col gap-4 items-start md:justify-between md:flex-row md:items-end">

      <Filter />
      <div className='flex justify-end gap-4 items-center'>
        <ErrorWarning err={error} />
        <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
      </div>

    </div>
    <TableDependencias permissions={permissions} />
  </div>
}
