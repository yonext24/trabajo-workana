import { ErrorWarning } from '@/components/common/error-warning'
import { NuevoButton } from '@/components/common/nuevo-button'
import { UnidadAddModal } from '@/components/modals/oferta-academica/unidad-academica/unidad-add-modal'
import { UnidadFilter } from '@/components/filters/unidadFilter'
import { TableUnidad } from '@/components/tables/oferta-academica/unidad-academica/table-unidad'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useSelector } from 'react-redux'

export function Unidad() {
  const { handleAdd } = useTableDefaultModals({
    add: { el: UnidadAddModal },
    place: 'unidad'
  })

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const error = useSelector(s => s.ofertaAcademica.unidadAcademica.unidad.error)
  const { CREATE } = permissions

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <UnidadFilter />
        <div className="flex items-end gap-4">
          <ErrorWarning err={error} />
          <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
        </div>
      </div>
      <TableUnidad permissions={permissions} />
    </div>
  )
}
