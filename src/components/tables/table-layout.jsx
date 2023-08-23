import { Loading } from '../common/loading'
import { Spinner } from '../common/spinner'
import { TableContainer } from './table-container'
import { TableHeader } from './table-header'

export function TableLayout ({ children, loading, columns, revalidating }) {
  return <>
    <TableContainer>

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
    {
      revalidating && <Spinner className={'absolute top-6 right-6 !border-black !h-4 !w-4 !border-2 !border-b-white'} />
    }
  </>
}
