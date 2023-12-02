import { NuevoButton } from '../../components/common/nuevo-button'
import { TableModulos } from '../../components/tables/general/table-modulos/table-modulos'
import { AddModulosModal } from '../../components/modals/general/modulos/add-modulos-modal'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { usePermissions } from '@/hooks/usePermissions'
import { useDataActions } from '@/hooks/useDataActions'
import { useEffect } from 'react'
import { ErrorWarning } from '@/components/common/error-warning'
import { useSelector } from 'react-redux'

// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Modulos() {
  const { handleAdd } = useTableDefaultModals({ add: { el: AddModulosModal } })
  const { getModulos } = useDataActions()

  useEffect(() => {
    getModulos()
  }, [])

  const permissions = usePermissions({ nameOfModule: 'GENERAL' })
  const { CREATE } = permissions
  const error = useSelector(s => s.data.modulos.error)

  return (
    <div id="page-content">
      <div className="flex justify-between w-full">
        <NuevoButton CREATE={CREATE} handleClick={handleAdd} />
        <ErrorWarning err={error} />
      </div>
      <TableModulos permissions={permissions} />
    </div>
  )
}
