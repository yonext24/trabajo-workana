import { NuevoButton } from '../../components/common/nuevo-button'
import { TablePuestos } from '../../components/tables/general/table-puestos/table-puestos'
import { AddPuestosModal } from '../../components/modals/general/puestos/add-puestos-modal'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Puestos () {
  const permissions = usePermissions({ nameOfModule: 'GENERAL' })
  const { CREATE } = permissions
  const { handleAdd } = useTableDefaultModals({
    place: 'dependencias',
    add: { el: AddPuestosModal }
  })

  return <div id='page-content'>
    {
      CREATE &&
      <NuevoButton handleClick={handleAdd} />
    }
    <TablePuestos permissions={permissions} />
  </div>
}
