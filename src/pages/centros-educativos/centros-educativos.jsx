import { NuevoButton } from '@/components/common/nuevo-button'
import { CentrosEducativosFilter } from '@/components/filters/centros-educativos-filter'
import { TableLayout } from '@/components/tables/table-layout'
import { usePermissions } from '@/hooks/usePermissions'

export function CentrosEducativos() {
  const permissions = usePermissions({ nameOfModule: 'CENTROS_EDUCATIVOS' })
  const { CREATE } = permissions

  return (
    <div id="page-content">
      <div className="w-full flex flex-col gap-4 md:justify-between md:flex-row md:items-end">
        <CentrosEducativosFilter />

        <NuevoButton handleClick={() => {}} CREATE={CREATE} />
      </div>

      <TableLayout columns={[{ text: 'Establecimiento' }, { text: 'Tipo título' }, { text: 'Título' }]}></TableLayout>
    </div>
  )
}
