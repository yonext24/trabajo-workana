import { useSelector } from 'react-redux'
import { TableLayout } from '../../table-layout'
import { ExtensionMainTableRow } from './extension-main-table-row'
import { useEffect } from 'react'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'

export function ExtensionMainTable({ permissions }) {
  const { data, revalidating, selectedUnidad } = useSelector(s => s.ofertaAcademica.extension)

  const { getOfertaAcademicaExtension } = useOfertaAcademicaActions()

  useEffect(() => {
    if (!selectedUnidad) return
    getOfertaAcademicaExtension({ unidad: selectedUnidad?.id_unidad })
  }, [selectedUnidad])

  return (
    <TableLayout
      loading={revalidating}
      columns={[
        { text: 'UA' },
        { text: 'Código' },
        { text: 'Nombre', className: 'w-3/4' },
        { text: 'Estado' },
        { text: 'Carreras' },
        { text: 'Acciones' }
      ]}
    >
      {data.map(el => (
        <ExtensionMainTableRow permissions={permissions} key={el.nombre} {...el} />
      ))}
    </TableLayout>
  )
}
