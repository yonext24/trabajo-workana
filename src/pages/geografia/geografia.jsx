import { ErrorWarning } from '@/components/common/error-warning'
import { NuevoButton } from '@/components/common/nuevo-button'
import { GeografiaFilter } from '@/components/filters/geografia-filter'
import { GeografiaAddModal } from '@/components/modals/geografia/geografia-add-modal'
import { GeografiaPagination } from '@/components/pagination/geografia/geografia-pagination'
import { TableGeografia } from '@/components/tables/geografia/table-geografia'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useSelector } from 'react-redux'

export function Geografia() {
  const { handleAdd } = useTableDefaultModals({
    place: 'geografia',
    add: {
      el: GeografiaAddModal
    }
  })

  const permissions = usePermissions({ nameOfModule: 'GEOGRAFICO' })
  const { CREATE } = permissions
  const errors = useSelector(s => s.geografia.error)

  return (
    <div id="page-content">
      <div className="w-full flex flex-col items-center gap-4 md:justify-between md:flex-row md:items-end">
        <GeografiaFilter />
        <div className="flex items-center justify-end gap-2">
          <ErrorWarning err={errors} />
          <NuevoButton content="Cargar Excel" CREATE={CREATE} handleClick={handleAdd} />
        </div>
      </div>
      <TableGeografia />
      <GeografiaPagination />
    </div>
  )
}
