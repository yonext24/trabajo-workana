import { NuevoButton } from '@/components/common/nuevo-button'
import { TableTipo } from '@/components/tables/oferta-academica/unidad-academica/table-tipo'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useEffect } from 'react'
import { TipoAddModal } from '@/components/modals/oferta-academica/unidad-academica/tipo-add-modal'

export function Tipo () {
  const { handleAdd } = useTableDefaultModals({ add: { el: TipoAddModal }, place: 'tipo' })
  const { getUnidadAcademicaTipos } = useOfertaAcademicaActions()

  useEffect(() => {
    getUnidadAcademicaTipos()
  }, [])

  return <div id='page-content'>
    <NuevoButton handleClick={handleAdd} />
    <TableTipo />
  </div>
}
