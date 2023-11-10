import { NuevoButton } from '@/components/common/nuevo-button'
import { CarreraTipoRecursoTable } from '@/components/tables/oferta-academica/carrera/tipo-recurso/carrera-tipo-recurso-table'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { AddTipoRecursoModal } from '@/components/modals/oferta-academica/carrera/tipo-recurso/tipo-recurso-add-modal'
import { usePermissions } from '@/hooks/usePermissions'
import { ErrorWarning } from '@/components/common/error-warning'
import { useSelector } from 'react-redux'

export function TipoRecurso() {
  const { handleAdd } = useTableDefaultModals({
    add: { el: AddTipoRecursoModal },
    place: 'tipo_nivel'
  })

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions
  const error = useSelector(s => s.ofertaAcademica.carrera.tipo_recurso.error)

  return (
    <div id="page-content">
      <div className="flex justify-between gap-4 items-center">
        <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
        <ErrorWarning err={error} />
      </div>
      <CarreraTipoRecursoTable permissions={permissions} />
    </div>
  )
}
