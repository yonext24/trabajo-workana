/* eslint-disable n/handle-callback-err */
import { NuevoButton } from '@/components/common/nuevo-button'
import { TableGeneral } from '@/components/tables/general/table-general/table-general'
import { AddSectorModal } from '@/components/modals/general/sectores/add-sector.modal'
import { useEffect } from 'react'
import { useDataActions } from '@/hooks/useDataActions'
import { useSelector } from 'react-redux'
import { Spinner } from '@/components/common/spinner'
import { toast } from 'react-toastify'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function GeneralSectores () {
  const { revalidating } = useSelector(s => s.data.general.sectores)
  const permissions = usePermissions({ nameOfModule: 'GENERAL' })
  const { CREATE } = permissions
  const { getSectoresData } = useDataActions()
  const { handleAdd } = useTableDefaultModals({
    place: 'general',
    add: {
      el: AddSectorModal
    }
  })

  useEffect(() => {
    getSectoresData()
      .catch(err => { toast.error('Ocurrió un error') })
  }, [])

  return <div id='page-content'>
    <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
    <TableGeneral permissions={permissions} />
    {
      revalidating && <Spinner className={'absolute top-6 right-6 !border-black !h-4 !w-4 !border-2 !border-b-white'} />
    }
  </div>
}
