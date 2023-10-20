import { NuevoButton } from '../../components/common/nuevo-button'
import { TablePuestos } from '../../components/tables/general/table-puestos/table-puestos'
import { AddPuestosModal } from '../../components/modals/general/puestos/add-puestos-modal'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { ErrorWarning } from '@/components/common/error-warning'
import { useSelector } from 'react-redux'

// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Puestos () {
  const permissions = usePermissions({ nameOfModule: 'GENERAL' })
  const { CREATE } = permissions

  const { handleAdd } = useTableDefaultModals({
    place: 'puestos',
    add: { el: AddPuestosModal }
  })

  const error = useSelector(s => s.data.puestos.error)

  return <div id='page-content'>

    <div className='flex justify-between'>
      <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
      <ErrorWarning err={error} />
    </div>

    <TablePuestos permissions={permissions} />
  </div>
}
