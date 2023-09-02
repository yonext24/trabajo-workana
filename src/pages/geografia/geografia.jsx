import { NuevoButton } from '@/components/common/nuevo-button'
import { SelectInput } from '@/components/common/select-input'
import { TableLayout } from '@/components/tables/table-layout'

export function Geografia () {
  return <div id='page-content'>
    <div className="flex justify-between items-end">

      <div className='flex flex-1 gap-4 [&>div]:flex [&>div]:flex-col [&>div]:w-full [&>div]:max-w-[210px] [&_label]:text-lg [&_label]:font-semibold'>

        <div>
          <label>País</label>
          <SelectInput options={['El Salvador']} firstOne handleOptionClick={() => {}} />
        </div>
        <div>
          <label>Departamento</label>
          <SelectInput options={['Todos']} firstOne handleOptionClick={() => {}} />
        </div>

      </div>

      <NuevoButton content='Cargar Excel' />
    </div>

    <TableLayout columns={[{ text: 'Departamento' }, { text: 'Municipio' }, { text: 'Código postal' }]}>

    </TableLayout>

  </div>
}
