import { ErrorWarning } from '@/components/common/error-warning'
import { NuevoButton } from '@/components/common/nuevo-button'
import { PermisoExtensionAddModal } from '@/components/modals/oferta-academica/extension/permiso/permiso-extension-add-modal'
import { PermisoExtensionMainTable } from '@/components/tables/oferta-academica/extension/permiso/permiso-extension-main-table'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useSelector } from 'react-redux'

export function Permiso() {
  const error = useSelector(s => s.ofertaAcademica.extension.permiso.error)
  const { handleAdd } = useTableDefaultModals({
    place: 'permiso-extension',
    add: {
      el: PermisoExtensionAddModal
    }
  })

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions

  return (
    <div id="page-content">
      <div className="flex justify-between">
        <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
        <ErrorWarning err={error} />
      </div>
      <PermisoExtensionMainTable permissions={permissions} />
    </div>
  )
}
