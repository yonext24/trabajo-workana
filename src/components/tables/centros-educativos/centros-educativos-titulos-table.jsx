import { RowLayout } from '../row-layout'
import { TableLayout } from '../table-layout'

export function CentrosEducativosTitulosTable({ loading, error, data }) {
  return (
    <TableLayout
      revalidating={loading}
      loading={loading}
      columns={[{ text: 'Código' }, { text: 'Título de diversificado', className: 'w-3/4' }]}
      hardError={error}
    >
      {data.map((el, i) => (
        <RowLayout key={el.id_titulo ?? i}>
          <td className="!border-r !text-center">{el.codigo}</td>
          <td>{el.nombre}</td>
        </RowLayout>
      ))}
    </TableLayout>
  )
}
