import { useSelector } from 'react-redux'
import { TableContainer } from '../../table-container'
import { TableHeader } from '../../table-header'
import { TableRolesRow } from './table-roles-row'

export function TableRoles () {
  // eslint-disable-next-line no-unused-vars
  const { data, loading, revalidating, error } = useSelector(s => s.usuarios).roles
  console.log(data)

  return <TableContainer>

  <table className='w-full font-semibold'>
      <TableHeader columns={[{ text: 'Nombre' }, { text: 'Descripcion' }, { text: 'Acciones' }]} />
      <tbody className='[&>tr:last-of-type_td]:border-b-0'>
        {
          data.map(el => <TableRolesRow key={el} {...el} />)
        }
      </tbody>
    </table>
  </TableContainer>
}
