/* eslint-disable n/handle-callback-err */
import { NuevoButton } from '@/components/common/nuevo-button'
import { TableGeneral } from '@/components/tables/general/table-general/table-general'
import { AddSectorModal } from '@/components/modals/general/sectores/add-sector.modal'
import { useEffect } from 'react'
import { useDataActions } from '@/hooks/useDataActions'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useSelector } from 'react-redux'
import { ErrorWarning } from '@/components/common/error-warning'

// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function GeneralSectores () {
  const permissions = usePermissions({ nameOfModule: 'GENERAL' })
  const { CREATE } = permissions
  const { getSectoresData } = useDataActions()
  const { handleAdd } = useTableDefaultModals({
    place: 'general',
    add: {
      el: AddSectorModal
    }
  })

  const error = useSelector(s => s.data.sectores.error)

  useEffect(() => {
    getSectoresData()
  }, [])

  return <div id='page-content'>
    <div className='flex justify-between'>
      <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
      <ErrorWarning err={error} />
    </div>
    <TableGeneral permissions={permissions} />
  </div>
}
