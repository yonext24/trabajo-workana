import { ErrorWarning } from '@/components/common/error-warning'
import { NuevoButton } from '@/components/common/nuevo-button'
import { SelectInput } from '@/components/common/select-input/select-input'
import { RecursoAddModal } from '@/components/modals/oferta-academica/carrera/recurso/recurso-add-modal'
import { RecursoTable } from '@/components/tables/oferta-academica/carrera/recurso/recurso-table'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function Recurso() {
  const {
    data: tipoRecursoData,
    error: tipoRecursoError,
    revalidating: tipoRecursoLoading
  } = useSelector(s => s.ofertaAcademica.carrera.tipo_recurso)
  const recursoData = useSelector(s => s.ofertaAcademica.carrera.recurso.data)
  const recursoError = useSelector(s => s.ofertaAcademica.carrera.recurso.error)

  const { handleAdd } = useTableDefaultModals({ add: { el: RecursoAddModal } })
  const { getCarreraRecursoData, getCarreraTipoRecursoData, setRecursoFiltered } = useOfertaAcademicaActions()

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions

  useEffect(() => {
    getCarreraRecursoData()
    getCarreraTipoRecursoData()
  }, [])

  const handleOptionClick = ({ id_tipo_recurso }) => {
    const filtered =
      id_tipo_recurso === -1 ? recursoData : recursoData.filter(el => el.id_tipo_recurso === id_tipo_recurso)
    setRecursoFiltered(filtered)
  }

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <div className="flex flex-col w-full max-w-[200px]">
          <label className="font-semibold text-lg">Tipo</label>
          <SelectInput
            handleOptionClick={handleOptionClick}
            loading={tipoRecursoLoading}
            error={tipoRecursoError}
            show="nombre"
            options={[{ nombre: 'Todas', id_tipo_recurso: -1 }, ...tipoRecursoData]}
          />
        </div>
        <div className="flex gap-4 items-center">
          <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
          <ErrorWarning err={recursoError} />
        </div>
      </div>
      <RecursoTable permissions={permissions} />
    </div>
  )
}
