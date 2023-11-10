import { NuevoButton } from '@/components/common/nuevo-button'
import { CarreraNivelTable } from '@/components/tables/oferta-academica/carrera/nivel/carrera-nivel-table'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { AddNivelModal } from '@/components/modals/oferta-academica/carrera/nivel/add-nivel-modal'
import { usePermissions } from '@/hooks/usePermissions'
import { useSelector } from 'react-redux'
import { ErrorWarning } from '@/components/common/error-warning'

export function Nivel() {
  const { handleAdd } = useTableDefaultModals({
    add: { el: AddNivelModal },
    place: 'nivel'
  })

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions
  const error = useSelector(s => s.ofertaAcademica.carrera.nivel.error)

  return (
    <div id="page-content">
      <div className="flex justify-between gap-4 items-center">
        <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
        <ErrorWarning err={error} />
      </div>
      <CarreraNivelTable permissions={permissions} />
    </div>
  )
}
