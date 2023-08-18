import { useSelector } from 'react-redux'
import { TableContainer } from '../table-container'
import { TableHeader } from '../table-header'
import { TableGeneralRow } from './table-general-row'

export function TableGeneral () {
  // eslint-disable-next-line no-unused-vars
  const { general: { sectores: { loading, data, error } } } = useSelector(s => s.data)

  return <TableContainer>

  <table className='w-full font-semibold'>
      <TableHeader columns={[{ text: 'Nombre' }, { text: 'Acciones' }]} />
      <tbody className='[&>tr:last-of-type_td]:border-b-0'>
        {
          data.map(el => <TableGeneralRow key={el.text} text={el.text} />)
        }
      </tbody>
    </table>
  </TableContainer>
}
