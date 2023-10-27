import { TableLayout } from '@/components/tables/table-layout'
import { useSelector } from 'react-redux'
import { CarreraTipoRecursoTableRow } from './carrera-tipo-recurso-table-row'

export function CarreraTipoRecursoTable({ permissions }) {
  const { data, loading, revalidating } = useSelector(
    s => s.ofertaAcademica.carrera.tipo_recurso
  )

  return (
    <TableLayout
      loading={loading}
      revalidating={revalidating}
      columns={[
        { text: 'Nombre' },
        { text: 'Descripcion' },
        { text: 'Acciones' }
      ]}
    >
      {data.map(el => (
        <CarreraTipoRecursoTableRow
          permissions={permissions}
          key={el.nombre ?? el.descripcion}
          {...el}
        />
      ))}
    </TableLayout>
  )
}
