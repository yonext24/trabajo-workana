import { RowLayout } from '../../row-layout'
import { TableLayout } from '../../table-layout'

export function CarreraExtensionModifyTable({ data }) {
  return (
    <TableLayout
      columns={[
        { text: 'Código' },
        { text: 'Carrera', className: 'text-center' },
        { text: 'Estado' }
      ]}
    >
      {data.map(el => (
        <RowLayout key={el.codigo}>
          <td className="border-r">{el.codigo}</td>
          <td className="border-r w-full text-center">{el.carrera}</td>
          <td className="border-r">
            <div className="flex justify-center">
              <input type="checkbox" />
            </div>
          </td>
        </RowLayout>
      ))}
    </TableLayout>
  )
}
