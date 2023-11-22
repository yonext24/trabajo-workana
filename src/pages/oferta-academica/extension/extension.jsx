import { ErrorWarning } from '@/components/common/error-warning'
import { NuevoButton } from '@/components/common/nuevo-button'
import { ExtensionFilter } from '@/components/filters/extension-filter'
import { ExtensionAddModal } from '@/components/modals/oferta-academica/extension/extension-add-modal'
import { ExtensionMainTable } from '@/components/tables/oferta-academica/extension/extension-main-table'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useSelector } from 'react-redux'

export function Extension() {
  const { handleAdd } = useTableDefaultModals({
    place: 'extension',
    add: { el: ExtensionAddModal }
  })

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions

  const error = useSelector(s => s.ofertaAcademica.extension.error)

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <ExtensionFilter />
        <div className="flex gap-2 justify-end">
          <ErrorWarning err={error} />
          <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
        </div>
      </div>
      <ExtensionMainTable permissions={permissions} />
    </div>
  )
}
