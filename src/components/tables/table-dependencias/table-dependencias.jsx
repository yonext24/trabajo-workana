import { TableContainer } from '../table-container'
import { TableHeader } from '../table-header'
import { TableDependenciasRow } from './table-dependencias-row'

export function TableDependencias ({ data }) {
  return <TableContainer>
    <table className='w-full font-semibold'>
      <TableHeader columns={Object.keys(data[0]).map(el => ({ text: el })).concat([{ text: 'acciones' }])} />
      <tbody className='[&>tr:last-of-type_td]:border-b-0'>
        {
          data.map(row => <TableDependenciasRow {...row} key={row.nombre} />)
        }
      </tbody>
    </table>

  </TableContainer>
}
