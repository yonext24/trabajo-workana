import { useSelector } from 'react-redux'
import { TableRolesRow } from './table-roles-row'
import { TableLayout } from '../../table-layout'

export function TableRoles ({ permissions }) {
  // eslint-disable-next-line no-unused-vars
  const { data, loading, revalidating, error } = useSelector(s => s.usuarios).roles

  return <TableLayout loading={loading} columns={[{ text: 'Nombre' }, { text: 'Descripcion' }, { text: 'Acciones' }]}>
    {
      data.map(el => <TableRolesRow key={el.nombre} {...el} permissions={permissions}></TableRolesRow>)
    }
  </TableLayout>
}
