import { useSelector } from 'react-redux'
import { TableLayout } from '../table-layout'
import { CentrosEducativosMainTableRow } from './centros-educativos-main-table-row'

export function CentrosEducativosTable() {
  const loading = useSelector(s => s.centrosEducativos.loading)
  const revalidating = useSelector(s => s.centrosEducativos.revalidating)
  const data = useSelector(s => s.centrosEducativos.data)

  return (
    <TableLayout
      revalidating={revalidating}
      loading={loading}
      columns={[{ text: 'Código' }, { text: 'Establecimiento', className: 'w-3/4' }, { text: 'Acciones' }]}
    >
      {data.map((el, i) => (
        <CentrosEducativosMainTableRow {...el} key={el.id_establecimiento ?? i} />
      ))}
    </TableLayout>
  )
}
