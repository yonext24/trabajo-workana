import { useSelector } from 'react-redux'
import { TableLayout } from '../table-layout'
import { TableGeografiaRow } from './table-geografia-row'

export function TableGeografia() {
  const { data, revalidating } = useSelector(s => s.geografia)

  return <RawTableGeografia data={data} revalidating={revalidating} />
}

export function RawTableGeografia({ data, revalidating }) {
  return (
    <TableLayout
      columns={[{ text: 'Departamento' }, { text: 'Municipio' }, { text: 'Código postal' }]}
      loading={revalidating}
    >
      {data.map(el => {
        return <TableGeografiaRow key={el.codigo_postal} {...el} />
      })}
    </TableLayout>
  )
}
