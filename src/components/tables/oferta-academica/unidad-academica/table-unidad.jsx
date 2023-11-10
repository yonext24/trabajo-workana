import { useSelector } from 'react-redux'
import { TableLayout } from '../../table-layout'
import { TableUnidadRow } from './table-unidad-row'
import { useEffect } from 'react'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'

export function TableUnidad({ permissions }) {
  const { filtered, loading, revalidating } = useSelector(s => s.ofertaAcademica.unidadAcademica.unidad)

  const { getUnidadAcademicaUnidad } = useOfertaAcademicaActions()

  useEffect(() => {
    getUnidadAcademicaUnidad()
  }, [])

  return (
    <TableLayout
      loading={loading}
      revalidating={revalidating}
      columns={[
        { text: 'Tipo UA', className: 'w-max' },
        { text: 'Código', className: '!px-2' },
        { text: 'Nombre', className: 'w-1/2 !max-w-[300px]' },
        { text: 'Abreviatura' },
        { text: 'Estado' },
        { text: 'Acciones' }
      ]}
    >
      {filtered.map(el => (
        <TableUnidadRow key={el.nombre} {...el} permissions={permissions} />
      ))}
    </TableLayout>
  )
}
