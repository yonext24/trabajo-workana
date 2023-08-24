import { NuevoButton } from '@/components/common/nuevo-button'
import { SelectInput } from '@/components/common/select-input'
import { CarreraCarreraTable } from '@/components/tables/oferta-academica/carrera/carrera/carrera-carrera-table'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useEffect } from 'react'

export function Carrera () {
  const { getCarreraCarreraData } = useOfertaAcademicaActions()

  useEffect(() => { getCarreraCarreraData() }, [])

  return <div id='page-content'>
    <div className='flex justify-between gap-6 items-end'>
      <div className='flex flex-col w-full max-w-[210px]'>
        <label className='text-lg font-semibold'>Nivel Carrera</label>
        <SelectInput options={[]} />
      </div>
      <NuevoButton />
    </div>
    <CarreraCarreraTable />
  </div>
}
