import { NuevoButton } from '@/components/common/nuevo-button'
import { SelectInput } from '@/components/common/select-input'
import { ExtensionAddModal } from '@/components/modals/oferta-academica/extension/extension-add-modal'
import { ExtensionMainTable } from '@/components/tables/oferta-academica/extension/extension-main-table'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function Extension () {
  const { getOfertaAcademicaExtension, setExtensionFiltered } = useOfertaAcademicaActions()
  const { handleAdd } = useTableDefaultModals({ place: 'extension', add: { el: ExtensionAddModal } })
  const { data } = useSelector(s => s.ofertaAcademica.extension)

  useEffect(() => {
    setExtensionFiltered(data)
  }, [data])

  useEffect(() => { getOfertaAcademicaExtension() }, [])

  return <div id="page-content">
    <div className="flex justify-between items-end">
      <div className='flex gap-4 text-lg font-semibold w-full'>
        <div className='flex flex-col w-full max-w-[190px]'>
          <label>Tipo unidad</label>
          <SelectInput options={['Escuela', 'Hospital']} firstOne/>
        </div>
        <div className='flex flex-col w-full max-w-[190px]'>
          <label>Unidad</label>
          <SelectInput options={['1', '2']} firstOne/>
        </div>
      </div>
      <NuevoButton handleClick={handleAdd} />
    </div>
    <ExtensionMainTable />
  </div>
}
