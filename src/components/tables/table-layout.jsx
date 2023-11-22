import { RevalidatingIndicator } from '../common/revalidating-indicator'
import { TableLoading } from './general/table-loading'
import { TableContainer } from './table-container'
import { TableHeader } from './table-header'

export function TableLayout({ children, loading, columns, revalidating, hardError }) {
  /*  HardError esta hecho para ser utilizado en las modales que tienen tablas dentro, y no pueden tener un ErrorWarning */
  return (
    <>
      <TableContainer>
        <table className="w-full font-semibold">
          <TableHeader columns={columns} />
          <tbody
            className="[&>tr:last-of-type_td]:border-b-0 [&>tr>td:last-of-type]:!border-r-0 [&>tr>td]:!px-px md:[&>tr>td]:!px-2
        [&>tr>td]:text-start md:[&>tr>td]:text-start text-xs sm:text-sm md:text-base [&>tr[data-disabled='true']_td]:!text-gray-400"
          >
            {children}
          </tbody>
        </table>

        <TableLoading loading={loading} />
        {hardError && (
          <div className="absolute w-full h-full left-0 top-0 bg-red-500/80 px-12 text-white flex items-center justify-center">
            {hardError}
          </div>
        )}
      </TableContainer>
      {revalidating && <RevalidatingIndicator />}
    </>
  )
}
