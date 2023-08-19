import { TableContainer } from '../../table-container'
import { TableHeader } from '../../table-header'
import { TableDependenciasRow } from './table-dependencias-row'

export function TableDependencias ({ data }) {
  if (data.length === 0) return null

  return <TableContainer>
    <table className='w-full font-semibold'>
      <TableHeader columns={['Sector', 'Nombre', 'Abreviatura', 'Unidad', 'Acciones'].map(el => ({ text: el }))} />
      <tbody className='[&>tr:last-of-type_td]:border-b-0'>
        {
          data.map(row => <TableDependenciasRow {...row} key={row.nombre} />)
        }
      </tbody>
    </table>

  </TableContainer>
}
