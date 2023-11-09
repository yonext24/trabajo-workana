import { useSelector } from 'react-redux'
import { TableDependenciasRow } from './table-dependencias-row'
import { TableLayout } from '../../table-layout'
import { useDataActions } from '@/hooks/useDataActions'
import { useEffect } from 'react'

export function TableDependencias({ permissions }) {
  const { getDependencias } = useDataActions()

  useEffect(() => {
    getDependencias()
  }, [])

  const { filtered, revalidating, loading } = useSelector(
    s => s.data.dependencias
  )

  return (
    <TableLayout
      loading={loading}
      revalidating={revalidating}
      columns={[
        'Sector',
        'Nombre',
        'Abreviatura',
        'Unidad',
        'Estado',
        'Acciones'
      ].map(el => ({ text: el }))}
    >
      {filtered.map(row => (
        <TableDependenciasRow
          permissions={permissions}
          {...row}
          key={row.id_dependencia}
        />
      ))}
    </TableLayout>
  )
}
