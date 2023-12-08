import { ErrorWarning } from '@/components/common/error-warning'
import { NuevoButton } from '@/components/common/nuevo-button'
import { RecursoFilter } from '@/components/filters/recurso-filter'
import { RecursoAddModal } from '@/components/modals/oferta-academica/carrera/recurso/recurso-add-modal'
import { RecursoTable } from '@/components/tables/oferta-academica/carrera/recurso/recurso-table'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function Recurso() {
  const recursoError = useSelector(s => s.ofertaAcademica.carrera.recurso.error)

  const { handleAdd } = useTableDefaultModals({ add: { el: RecursoAddModal } })
  const { getCarreraRecursoData, getCarreraTipoRecursoData } = useOfertaAcademicaActions()

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions

  useEffect(() => {
    getCarreraRecursoData()
    getCarreraTipoRecursoData()
  }, [])

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <RecursoFilter />
        <div className="flex gap-4 items-center">
          <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
          <ErrorWarning err={recursoError} />
        </div>
      </div>
      <RecursoTable permissions={permissions} />
    </div>
  )
}
