import { useSelector } from 'react-redux'
import { TableLayout } from '../../table-layout'
import { useEffect } from 'react'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { TablePermisosRow } from './table-permisos-row'

export function TablePermisos ({ outsideData, columns = [], selectFunction = false }) {
  // eslint-disable-next-line no-unused-vars
  const { data, loading, filtered, revalidating, error } = useSelector(s => s.usuarios).permisos
  const { getPermisosData } = useUsuariosActions()
  console.log(data)

  useEffect(() => { if (!outsideData) getPermisosData() }, [])

  return <TableLayout loading={loading} columns={[{ text: 'Módulo' }, { text: 'Operación' }, { text: 'Unidad' }, { text: 'Extensión' }, { text: 'Nivel' }, ...columns]}>
    {
      outsideData
        ? outsideData.map((el, i) => <TablePermisosRow key={i} withActions={false} selectFunction={selectFunction} {...el} />)
        : filtered.map((el, i) => <TablePermisosRow key={i} withActions {...el} />)
    }
  </TableLayout>
}
