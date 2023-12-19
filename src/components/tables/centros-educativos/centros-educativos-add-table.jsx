import { RowLayout } from '../row-layout'
import { TableLayout } from '../table-layout'

export function CentrosEducativosAddTable({ data }) {
  return (
    <TableLayout
      columns={[
        { text: 'Código' },
        { text: 'Establecimiento', className: 'w-1/4' },
        { text: 'Departamento' },
        { text: 'Municipio' },
        { text: 'Sector' },
        { text: 'Título', className: 'w-3/4 truncate' }
      ]}
    >
      {data.map((el, i) => {
        const { codigo_establecimiento, establecimiento, departamento, municipio, sector, titulo } = el

        return (
          <RowLayout key={i}>
            <td className="!border-r !text-center">{codigo_establecimiento}</td>
            <td className="!border-r !text-center">{establecimiento}</td>
            <td className="!border-r !text-center">{departamento}</td>
            <td className="!border-r !text-center">{municipio}</td>
            <td className="!border-r !text-center">{sector}</td>
            <td className="!border-r !text-center">{titulo}</td>
          </RowLayout>
        )
      })}
    </TableLayout>
  )
}
