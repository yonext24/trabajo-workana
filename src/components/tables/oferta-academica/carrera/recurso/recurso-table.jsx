import { TableLayout } from '@/components/tables/table-layout'
import { useSelector } from 'react-redux'
import { RecursoTableRow } from './recurso-table-row'

export function RecursoTable ({ permissions }) {
  const { filtered, loading, revalidating } = useSelector(s => s.ofertaAcademica.carrera.recurso)

  return <TableLayout loading={loading} revalidating={revalidating} columns={[{ text: 'Tipo' }, { text: 'Recurso' }, { text: 'Descripcion' }, { text: 'Acciones' }]}>
    {
      filtered.map(el => <RecursoTableRow permissions={permissions} key={el.nombre} {...el} />)
    }
  </TableLayout>
}
