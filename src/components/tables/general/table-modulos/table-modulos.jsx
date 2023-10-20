import { useSelector } from 'react-redux'
import { TableModulosRow } from './table-modulos-row'
import { TableLayout } from '../../table-layout'

export function TableModulos ({ permissions }) {
  const { loading, data, revalidating } = useSelector(s => s.data.modulos)

  return <TableLayout columns={[{ text: 'Tipo' }, { text: 'Nombre' }, { text: 'Acciones' }]} loading={loading} revalidating={revalidating}>
    {
      data.map(el => <TableModulosRow permissions={permissions} key={el.nombre} {...el} />)
    }
  </TableLayout>
}
