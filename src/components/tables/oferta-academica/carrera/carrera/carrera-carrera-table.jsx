import { TableLayout } from '@/components/tables/table-layout'
import { useSelector } from 'react-redux'
import { CarreraCarreraTableRow } from './carrera-carrera-table-row'

export function CarreraCarreraTable () {
  const { filtered } = useSelector(s => s.ofertaAcademica.carrera.carrera)
  return <TableLayout columns={[{ text: 'Nivel' }, { text: 'Carrera', className: 'w-full' }, { text: 'Estado' }, { text: 'Acciones' }]}>
    {
      filtered.map(el => <CarreraCarreraTableRow key={el.carrera} {...el} />)
    }
  </TableLayout>
}
