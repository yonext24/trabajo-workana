import { NuevoButton } from '@/components/common/nuevo-button'
import { TableTipo } from '@/components/tables/oferta-academica/unidad-academica/table-tipo'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useEffect } from 'react'
import { TipoAddModal } from '@/components/modals/oferta-academica/unidad-academica/tipo-add-modal'
import { usePermissions } from '@/hooks/usePermissions'

export function Tipo() {
  const { handleAdd } = useTableDefaultModals({
    add: { el: TipoAddModal },
    place: 'tipo'
  })
  const { getUnidadAcademicaTipos } = useOfertaAcademicaActions()

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions

  useEffect(() => {
    getUnidadAcademicaTipos()
  }, [])

  return (
    <div id="page-content">
      <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
      <TableTipo permissions={permissions} />
    </div>
  )
}
