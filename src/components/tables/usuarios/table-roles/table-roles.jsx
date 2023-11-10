import { useSelector } from 'react-redux'
import { TableRolesRow } from './table-roles-row'
import { TableLayout } from '../../table-layout'
import { useEffect } from 'react'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'

export function TableRoles({ permissions }) {
  const { getRolesData } = useUsuariosActions()
  useEffect(() => {
    getRolesData()
  }, [])

  // eslint-disable-next-line no-unused-vars
  const { data, loading, revalidating } = useSelector(s => s.usuarios.roles)

  return (
    <TableLayout
      loading={loading}
      revalidating={revalidating}
      columns={[{ text: 'Nombre' }, { text: 'Descripcion' }, { text: 'Estado' }, { text: 'Acciones' }]}
    >
      {data.map(el => (
        <TableRolesRow key={el.nombre} {...el} permissions={permissions}></TableRolesRow>
      ))}
    </TableLayout>
  )
}
