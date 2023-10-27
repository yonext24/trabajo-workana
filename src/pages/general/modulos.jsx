import { NuevoButton } from '../../components/common/nuevo-button'
import { TableModulos } from '../../components/tables/general/table-modulos/table-modulos'
import { AddModulosModal } from '../../components/modals/general/modulos/add-modulos-modal'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { usePermissions } from '@/hooks/usePermissions'
import { useDataActions } from '@/hooks/useDataActions'
import { useEffect } from 'react'

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

  return (
    <div id="page-content">
      <NuevoButton CREATE={CREATE} handleClick={handleAdd} />
      <TableModulos permissions={permissions} />
    </div>
  )
}
