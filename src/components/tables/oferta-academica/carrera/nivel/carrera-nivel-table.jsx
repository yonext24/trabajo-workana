import { TableLayout } from '@/components/tables/table-layout'
import { useSelector } from 'react-redux'
import { CarreraNivelTableRow } from './carrera-nivel-table-row'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useEffect } from 'react'

export function CarreraNivelTable({ permissions }) {
  const { data, loading, revalidating } = useSelector(s => s.ofertaAcademica.carrera.nivel)

  const { getCarreraNivelData } = useOfertaAcademicaActions()

  useEffect(() => {
    getCarreraNivelData()
  }, [])

  return (
    <TableLayout
      loading={loading}
      revalidating={revalidating}
      columns={[{ text: 'Nombre' }, { text: 'Descripcion' }, { text: 'Estado' }, { text: 'Acciones' }]}
    >
      {data.map(el => (
        <CarreraNivelTableRow permissions={permissions} key={el.nombre ?? el.descripcion} {...el} />
      ))}
    </TableLayout>
  )
}
