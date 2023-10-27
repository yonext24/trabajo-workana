import { NuevoButton } from '@/components/common/nuevo-button'
import { CarreraNivelTable } from '@/components/tables/oferta-academica/carrera/nivel/carrera-nivel-table'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useEffect } from 'react'
import { AddNivelModal } from '@/components/modals/oferta-academica/carrera/nivel/add-nivel-modal'
import { usePermissions } from '@/hooks/usePermissions'

export function Nivel() {
  const { handleAdd } = useTableDefaultModals({
    add: { el: AddNivelModal },
    place: 'nivel'
  })
  const { getCarreraNivelData } = useOfertaAcademicaActions()

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions

  useEffect(() => {
    getCarreraNivelData()
  }, [])

  return (
    <div id="page-content">
      <NuevoButton handleClick={handleAdd} CREATE={CREATE} />
      <CarreraNivelTable permissions={permissions} />
    </div>
  )
}
