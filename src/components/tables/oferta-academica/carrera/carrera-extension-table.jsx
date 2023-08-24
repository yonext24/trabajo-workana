import { Row } from '../../row'
import { RowLayout } from '../../row-layout'
import { TableLayout } from '../../table-layout'

export function CarreraExtensionTable ({ data }) {
  const columns = [
    { text: '02', className: 'text-center' },
    { text: 'Experto en geografía 1', className: 'text-center' },
    { text: 'Activo' },
    { text: 'Fecha de Creación', className: 'text-center' }
  ]
  return <TableLayout columns={[{ text: 'Código' }, { text: 'Carrera', className: 'w-1/2' }, { text: 'Estado' }, { text: 'Fecha de creación', className: 'w-1/3' }]}>
    {
      data.map(el => (
        <RowLayout key={el.id}>
          {
            columns.map(el => <Row key={el.text} {...el}></Row>)
          }
        </RowLayout>
      ))
    }
  </TableLayout>
}
