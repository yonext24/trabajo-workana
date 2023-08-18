// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

import { useSelector } from 'react-redux'
import { TableDependencias } from '../../components/tables/table-dependencias/table-dependencias'
import { NuevoButton } from '../../components/common/nuevo-button'
import { Filter } from '../../components/general/filter'

export function Dependencias () {
  const { general: { dependencias: { data: { filtered } } } } = useSelector(s => s.data)

  return <div id='page-content'>
    <div className="w-full flex justify-between items-end">

      <Filter />
      <NuevoButton />

    </div>
    <TableDependencias data={filtered} />
  </div>
}
