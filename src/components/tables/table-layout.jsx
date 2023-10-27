import { RevalidatingIndicator } from '../common/revalidating-indicator'
import { TableLoading } from './general/table-loading'
import { TableContainer } from './table-container'
import { TableHeader } from './table-header'

export function TableLayout({ children, loading, columns, revalidating }) {
  return (
    <>
      <TableContainer>
        <table className="w-full font-semibold">
          <TableHeader columns={columns} />
          <tbody
            className="[&>tr:last-of-type_td]:border-b-0 [&>tr>td:last-of-type]:!border-r-0 [&>tr>td]:!px-px md:[&>tr>td]:!px-2
        [&>tr>td]:text-start md:[&>tr>td]:text-start text-xs sm:text-sm md:text-base"
          >
            {children}
          </tbody>
        </table>

        <TableLoading loading={loading} />
      </TableContainer>
      {revalidating && <RevalidatingIndicator />}
    </>
  )
}
