import { NuevoButton } from '@/components/common/nuevo-button'
import { SelectInput } from '@/components/common/select-input'
import { CarreraAddModal } from '@/components/modals/oferta-academica/carrera/carrera/carrera-add-modal'
import { CarreraCarreraTable } from '@/components/tables/oferta-academica/carrera/carrera/carrera-carrera-table'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { usePermissions } from '@/hooks/usePermissions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useEffect } from 'react'

export function Carrera () {
  const { getCarreraCarreraData } = useOfertaAcademicaActions()
  const { handleAdd } = useTableDefaultModals({ add: { el: CarreraAddModal } })

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { CREATE } = permissions

  useEffect(() => { getCarreraCarreraData() }, [])

  return <div id='page-content'>
    <div className='flex justify-between gap-6 items-end'>
      <div className='flex flex-col w-full max-w-[210px]'>
        <label className='text-lg font-semibold'>Nivel Carrera</label>
        <SelectInput options={[]} />
      </div>
      {
        CREATE &&
        <NuevoButton handleClick={handleAdd} />
      }
    </div>
    <CarreraCarreraTable permissions={permissions} />
  </div>
}
