import { NuevoButton } from '@/components/common/nuevo-button'
import { SelectInput } from '@/components/common/select-input'
import { TableLayout } from '@/components/tables/table-layout'
import { usePermissions } from '@/hooks/usePermissions'

export function CentrosEducativos() {
  const permissions = usePermissions({ nameOfModule: 'CENTROS_EDUCATIVOS' })
  const { CREATE } = permissions

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <div className="flex flex-1 gap-4 [&>div]:flex [&>div]:flex-col [&>div]:w-full [&>div]:max-w-[210px] [&_label]:text-lg [&_label]:font-semibold">
          <div>
            <label>Sector</label>
            <SelectInput
              options={['Privado', 'Público']}
              firstOne
              handleOptionClick={() => {}}
            />
          </div>
          <div>
            <label>Establecimiento</label>
            <SelectInput
              options={['Todos']}
              firstOne
              handleOptionClick={() => {}}
            />
          </div>
        </div>

        <NuevoButton handleClick={() => {}} CREATE={CREATE} />
      </div>

      <TableLayout
        columns={[
          { text: 'Establecimiento' },
          { text: 'Tipo título' },
          { text: 'Título' }
        ]}
      ></TableLayout>
    </div>
  )
}
