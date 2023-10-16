import { useSelector } from 'react-redux'
import { TableContainer } from '../../table-container'
import { TableHeader } from '../../table-header'
import { TablePuestosRow } from './table-puestos-row'

export function TablePuestos ({ permissions }) {
  // eslint-disable-next-line no-unused-vars
  const { loading, data, error } = useSelector(s => s.data.general.puestos)

  return <TableContainer>

  <table className='w-full font-semibold'>
      <TableHeader columns={[{ text: 'Nombre' }, { text: 'Acciones' }]} />
      <tbody className='[&>tr:last-of-type_td]:border-b-0'>
        {
          data.map(el => <TablePuestosRow key={el} text={el} permissions={permissions} />)
        }
      </tbody>
    </table>
  </TableContainer>
}
