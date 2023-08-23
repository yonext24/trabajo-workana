import { NuevoButton } from '@/components/common/nuevo-button'
import { UnidadAddModal } from '@/components/modals/oferta-academica/unidad-academica/unidad-add-modal'
import { UnidadFilter } from '@/components/ofertaAcademica/unidadFilter'
import { TableUnidad } from '@/components/tables/oferta-academica/unidad-academica/table-unidad'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useEffect } from 'react'

export function Unidad () {
  const { getUnidadAcademicaUnidad } = useOfertaAcademicaActions()
  const { handleAdd } = useTableDefaultModals({ add: { el: UnidadAddModal }, place: 'unidad' })

  useEffect(() => {
    getUnidadAcademicaUnidad()
  }, [])

  return <div id='page-content'>
    <div className='flex justify-between items-end'>
      <UnidadFilter />
      <NuevoButton handleClick={handleAdd} />
    </div>
    <TableUnidad />
  </div>
}
