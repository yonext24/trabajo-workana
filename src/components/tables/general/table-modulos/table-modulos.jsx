import { useSelector } from 'react-redux'
import { TableContainer } from '../../table-container'
import { TableHeader } from '../../table-header'
import { TableModulosRow } from './table-modulos-row'

export function TableModulos () {
  // eslint-disable-next-line no-unused-vars
  const { general: { modulos: { loading, data, error } } } = useSelector(s => s.data)

  return <TableContainer>

  <table className='w-full font-semibold'>
      <TableHeader columns={[{ text: 'Nombre', priority: true }, { text: 'Acciones' }]} />
      <tbody className='[&>tr:last-of-type_td]:border-b-0'>
        {
          data.map(el => <TableModulosRow key={el} text={el} />)
        }
      </tbody>
    </table>
  </TableContainer>
}
