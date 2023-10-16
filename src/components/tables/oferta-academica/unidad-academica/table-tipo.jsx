import { useSelector } from 'react-redux'
import { TableLayout } from '../../table-layout'
import { TableTipoRow } from './table-tipo-row'

export function TableTipo ({ permissions }) {
  const { data, loading, revalidating } = useSelector(s => s.ofertaAcademica).unidadAcademica.tipo

  return <TableLayout columns={[{ text: 'Nombre' }, { text: 'Descripción' }, { text: 'Acciones' }]} loading={loading} revalidating={revalidating}>
    {
      data.map(el => <TableTipoRow permissions={permissions} key={el.nombre} {...el} />)
    }
  </TableLayout>
}
