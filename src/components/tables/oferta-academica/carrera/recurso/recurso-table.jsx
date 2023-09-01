import { TableLayout } from '@/components/tables/table-layout'
import { useSelector } from 'react-redux'
import { RecursoTableRow } from './recurso-table-row'

export function RecursoTable () {
  const { filtered, loading, revalidating } = useSelector(s => s.ofertaAcademica.carrera.recurso)

  return <TableLayout loading={loading} revalidating={revalidating} columns={[{ text: 'Tipo' }, { text: 'Recurso' }, { text: 'Descripcion' }, { text: 'Acciones' }]}>
    {
      filtered.map(el => <RecursoTableRow key={el.nombre} {...el} />)
    }
  </TableLayout>
}
