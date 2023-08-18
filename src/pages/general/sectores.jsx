import { NuevoButton } from '../../components/common/nuevo-button'
import { TableGeneral } from '../../components/tables/table-general/table-general'

// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function GeneralSectores () {
  return <div id='page-content'>
    <NuevoButton />
    <TableGeneral />
  </div>
}
