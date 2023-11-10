import { useSelector } from 'react-redux'
import { TableGeneralRow } from './table-general-row'
import { TableLayout } from '../../table-layout'

// Esta tabla no debería llamarse general, debería llamarse sectores

export function TableGeneral({ permissions }) {
  const { loading, data, revalidating } = useSelector(s => s.data.sectores)

  return (
    <TableLayout
      loading={loading}
      revalidating={revalidating}
      columns={[{ text: 'Nombre' }, { text: 'Estado' }, { text: 'Acciones', className: 'max-w-[40%] w-full' }]}
    >
      {data.map(el => (
        <TableGeneralRow permissions={permissions} key={el.nombre} {...el} />
      ))}
    </TableLayout>
  )
}
