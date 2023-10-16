import { TableLayout } from '@/components/tables/table-layout'
import { useSelector } from 'react-redux'
import { CarreraNivelTableRow } from './carrera-nivel-table-row'

export function CarreraNivelTable ({ permissions }) {
  const { data, loading, revalidating } = useSelector(s => s.ofertaAcademica.carrera.nivel)

  return <TableLayout loading={loading} revalidating={revalidating} columns={[{ text: 'Nombre' }, { text: 'Descripcion' }, { text: 'Acciones' }]}>
    {
      data.map(el => <CarreraNivelTableRow permissions={permissions} key={el.nombre ?? el.descripcion} {...el} />)
    }
  </TableLayout>
}
