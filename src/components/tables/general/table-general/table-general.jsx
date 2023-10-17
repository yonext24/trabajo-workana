import { useSelector } from 'react-redux'
import { TableGeneralRow } from './table-general-row'
import { TableLayout } from '../../table-layout'

export function TableGeneral ({ permissions }) {
  // eslint-disable-next-line no-unused-vars
  const { loading, data, revalidating } = useSelector(s => s.data.sectores)

  return <TableLayout loading={loading} revalidating={revalidating} columns={[{ text: 'Nombre' }, { text: 'Acciones', className: 'max-w-[40%] w-full' }]}>
      {
        data.map(el => <TableGeneralRow permissions={permissions} key={el} text={el} />)
      }
    </TableLayout>
}
