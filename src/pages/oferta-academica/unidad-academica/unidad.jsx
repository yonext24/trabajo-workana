import { NuevoButton } from '@/components/common/nuevo-button'
import { UnidadAddModal } from '@/components/modals/oferta-academica/unidad-academica/unidad-add-modal'
import { UnidadFilter } from '@/components/ofertaAcademica/unidadFilter'
import { TableUnidad } from '@/components/tables/oferta-academica/unidad-academica/table-unidad'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function Unidad() {
  const { handleAdd } = useTableDefaultModals({
    add: { el: UnidadAddModal },
    place: 'unidad'
  })

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <UnidadFilter />
        <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
      </div>
      <TableUnidad permissions={permissions} />
    </div>
  )
}
