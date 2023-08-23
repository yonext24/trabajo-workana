import { NuevoButton } from '@/components/common/nuevo-button'
import { SelectInput } from '@/components/common/select-input'
import { ExtensionMainTable } from '@/components/tables/oferta-academica/extension/extension-main-table'

export function Extension () {
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
      <NuevoButton />
    </div>
    <ExtensionMainTable />
  </div>
}
