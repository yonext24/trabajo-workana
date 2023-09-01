import { NuevoButton } from '@/components/common/nuevo-button'
import { SelectInput } from '@/components/common/select-input'
import { RecursoAddModal } from '@/components/modals/oferta-academica/carrera/recurso/recurso-add-modal'
import { RecursoTable } from '@/components/tables/oferta-academica/carrera/recurso/recurso-table'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function Recurso () {
  const { data: tipoRecursoData } = useSelector(s => s.ofertaAcademica.carrera.tipo_recurso)
  const { data: recursoData } = useSelector(s => s.ofertaAcademica.carrera.recurso)
  const { handleAdd } = useTableDefaultModals({ add: { el: RecursoAddModal } })
  const { getCarreraRecursoData, getCarreraTipoRecursoData, setRecursoFiltered } = useOfertaAcademicaActions()

  useEffect(() => {
    getCarreraRecursoData()
    getCarreraTipoRecursoData()
  }, [])

  const handleOptionClick = data => {
    const filtered = data === 'Todas' ? recursoData : recursoData.filter(el => el.tipo === data)
    setRecursoFiltered(filtered)
  }

  return <div id='page-content'>
    <div className='flex justify-between items-end'>
      <div className='flex flex-col max-w-[240px]'>
        <label className='font-semibold text-lg'>Tipo</label>
        <SelectInput handleOptionClick={handleOptionClick} options={['Todas', ...tipoRecursoData.map(el => el.nombre)]} />
      </div>
      <NuevoButton handleClick={handleAdd}/>
    </div>
    <RecursoTable />
  </div>
}
