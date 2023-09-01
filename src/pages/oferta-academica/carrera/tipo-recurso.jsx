import { NuevoButton } from '@/components/common/nuevo-button'
import { CarreraTipoRecursoTable } from '@/components/tables/oferta-academica/carrera/tipo-recurso/carrera-tipo-recurso-table'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useEffect } from 'react'
import { AddTipoRecursoModal } from '@/components/modals/oferta-academica/carrera/tipo-recurso/tipo-recurso-add-modal'

export function TipoRecurso () {
  const { handleAdd } = useTableDefaultModals({ add: { el: AddTipoRecursoModal }, place: 'tipo_nivel' })
  const { getCarreraTipoRecursoData } = useOfertaAcademicaActions()

  useEffect(() => { getCarreraTipoRecursoData() }, [])

  return <div id='page-content'>
    <NuevoButton handleClick={handleAdd} />
    <CarreraTipoRecursoTable />
  </div>
}
