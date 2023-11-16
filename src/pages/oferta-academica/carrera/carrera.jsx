import { ErrorWarning } from '@/components/common/error-warning'
import { NuevoButton } from '@/components/common/nuevo-button'
import { CarreraFilter } from '@/components/filters/carrera-filter'
import { CarreraAddModal } from '@/components/modals/oferta-academica/carrera/carrera/carrera-add-modal'
import { CarreraPagination } from '@/components/pagination/carrera/carrera-pagination'
import { CarreraCarreraTable } from '@/components/tables/oferta-academica/carrera/carrera/carrera-carrera-table'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useSelector } from 'react-redux'

export function Carrera() {
  const { handleAdd } = useTableDefaultModals({ add: { el: CarreraAddModal } })

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions
  const error = useSelector(s => s.ofertaAcademica.carrera.carrera.error)

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <CarreraFilter />
        <div className="flex items-center gap-4">
          <ErrorWarning err={error} />
          <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
        </div>
      </div>
      <CarreraCarreraTable permissions={permissions} />
      <CarreraPagination />
    </div>
  )
}
