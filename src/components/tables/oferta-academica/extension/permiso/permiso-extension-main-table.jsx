import { TableLayout } from '@/components/tables/table-layout'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { PermisoExtensionMainTableRow } from './permiso-extension-main-table-row'

export function PermisoExtensionMainTable({ permissions }) {
  const { data, revalidating, loading } = useSelector(s => s.ofertaAcademica.extension.permiso)

  const { getOfertaAcademicaPermiso } = useOfertaAcademicaActions()

  useEffect(() => {
    getOfertaAcademicaPermiso()
  }, [])

  return (
    <TableLayout
      revalidating={revalidating}
      loading={loading}
      columns={[
        { text: 'Nombre' },
        { text: 'Descripción', className: 'w-1/2' },
        { text: 'Estado' },
        { text: 'Acciones' }
      ]}
    >
      {data.map(el => (
        <PermisoExtensionMainTableRow permissions={permissions} key={el.id_permiso} {...el} />
      ))}
    </TableLayout>
  )
}
