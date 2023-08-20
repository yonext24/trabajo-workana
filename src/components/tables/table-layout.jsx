import { Loading } from '../common/loading'
import { TableContainer } from './table-container'
import { TableHeader } from './table-header'

export function TableLayout ({ children, loading, columns }) {
  return <TableContainer>

  <table className='w-full font-semibold'>
      <TableHeader columns={columns} />
      <tbody className='[&>tr:last-of-type_td]:border-b-0 [&>tr>td:last-of-type]:!border-r-0 [&>tr>td]:!px-2'>
        {children}
      </tbody>
    </table>

    {
      loading && <Loading />
    }
  </TableContainer>
}
