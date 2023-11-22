import { TableLayout } from '@/components/tables/table-layout'
import { useSelector } from 'react-redux'
import { RecursoTableRow } from './recurso-table-row'

export function RecursoTable({
  permissions,
  outsideData,
  outsideLoading,
  outsideError,
  selectFunction,
  columns = [{ text: 'Tipo' }, { text: 'Recurso' }, { text: 'Descripcion' }, { text: 'Acciones' }]
}) {
  const { filtered, loading, revalidating } = useSelector(s => s.ofertaAcademica.carrera.recurso)

  return (
    <TableLayout
      loading={loading || outsideLoading}
      revalidating={revalidating}
      hardError={outsideError}
      columns={columns}
    >
      {outsideData
        ? outsideData.map(el => (
            <RecursoTableRow
              permissions={permissions}
              key={el.id_recurso}
              fromCarrera
              selectFunction={selectFunction}
              {...el}
            />
          ))
        : filtered.map(el => <RecursoTableRow permissions={permissions} key={el.id_recurso} {...el} />)}
    </TableLayout>
  )
}
