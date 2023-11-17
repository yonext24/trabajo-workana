import { TableLayout } from '@/components/tables/table-layout'
import { useSelector } from 'react-redux'
import { RecursoTableRow } from './recurso-table-row'

export function RecursoTable({ permissions, outsideData }) {
  const { filtered, loading, revalidating } = useSelector(s => s.ofertaAcademica.carrera.recurso)

  return (
    <TableLayout
      loading={loading}
      revalidating={revalidating}
      columns={[{ text: 'Tipo' }, { text: 'Recurso' }, { text: 'Descripcion' }, { text: 'Acciones' }]}
    >
      {outsideData
        ? outsideData.map(el => <RecursoTableRow permissions={permissions} key={el.id_recurso} {...el} />)
        : filtered.map(el => <RecursoTableRow permissions={permissions} key={el.id_recurso} {...el} />)}
    </TableLayout>
  )
}
