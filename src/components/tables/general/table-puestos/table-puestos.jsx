import { useSelector } from 'react-redux'
import { TablePuestosRow } from './table-puestos-row'
import { TableLayout } from '../../table-layout'
import { useDataActions } from '@/hooks/useDataActions'
import { useEffect } from 'react'

export function TablePuestos({ permissions }) {
  const { getPuestos } = useDataActions()
  useEffect(() => {
    getPuestos()
  }, [])

  const { loading, data, revalidating } = useSelector(s => s.data.puestos)

  return (
    <TableLayout
      columns={[{ text: 'Nombre' }, { text: 'Estado' }, { text: 'Acciones' }]}
      loading={loading}
      revalidating={revalidating}
    >
      {data.map(el => (
        <TablePuestosRow key={el.id_puesto} {...el} permissions={permissions} />
      ))}
    </TableLayout>
  )
}
