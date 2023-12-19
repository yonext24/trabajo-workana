import { ErrorWarning } from '@/components/common/error-warning'
import { NuevoButton } from '@/components/common/nuevo-button'
import { CentrosEducativosFilter } from '@/components/filters/centros-educativos-filter'
import { CentrosEducativosAddModal } from '@/components/modals/centros-educativos/centros-educativos-add-modal'
import { CentrosEducativosTable } from '@/components/tables/centros-educativos/centros-educativos-main-table'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useSelector } from 'react-redux'

export function CentrosEducativos() {
  const permissions = usePermissions({ nameOfModule: 'CENTROS_EDUCATIVOS' })
  const { CREATE } = permissions
  const { handleAdd } = useTableDefaultModals({
    place: 'geografia',
    add: {
      el: CentrosEducativosAddModal
    }
  })
  const errors = useSelector(s => s.centrosEducativos.error)

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <CentrosEducativosFilter />

        <div className="flex items-center justify-center gap-2">
          <ErrorWarning err={errors} />
          <NuevoButton handleClick={handleAdd} content="Cargar Excel" CREATE={CREATE} />
        </div>
      </div>

      <CentrosEducativosTable />
    </div>
  )
}
