import { TableLayout } from '@/components/tables/table-layout'
import { useSelector } from 'react-redux'
import { CarreraCarreraTableRow } from './carrera-carrera-table-row'
import { useEffect } from 'react'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'

export function CarreraCarreraTable({ permissions }) {
  const { filtered, data } = useSelector(s => s.ofertaAcademica.carrera.carrera)
  const { setCarreraCarreraFiltered } = useOfertaAcademicaActions()

  useEffect(() => {
    setCarreraCarreraFiltered(data)
  }, [data])

  return (
    <TableLayout
      columns={[
        { text: 'Nivel' },
        { text: 'Carrera', className: 'w-full' },
        { text: 'Estado' },
        { text: 'Acciones' }
      ]}
    >
      {filtered.map(el => (
        <CarreraCarreraTableRow
          permissions={permissions}
          key={el.carrera}
          {...el}
        />
      ))}
    </TableLayout>
  )
}
