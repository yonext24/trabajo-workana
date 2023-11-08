import { NuevoButton } from '@/components/common/nuevo-button'
import { TableTipo } from '@/components/tables/oferta-academica/unidad-academica/table-tipo'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { TipoAddModal } from '@/components/modals/oferta-academica/unidad-academica/tipo-add-modal'
import { usePermissions } from '@/hooks/usePermissions'
import { useSelector } from 'react-redux'
import { ErrorWarning } from '@/components/common/error-warning'

export function Tipo() {
  const { handleAdd } = useTableDefaultModals({
    add: { el: TipoAddModal },
    place: 'tipo'
  })

  const error = useSelector(s => s.ofertaAcademica.unidadAcademica.tipo.error)
  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions

  return (
    <div id="page-content">
      <div className="flex justify-between">
        <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
        <ErrorWarning err={error} />
      </div>
      <TableTipo permissions={permissions} />
    </div>
  )
}
