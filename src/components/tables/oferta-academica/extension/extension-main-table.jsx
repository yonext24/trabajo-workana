import { TableLayout } from '../../table-layout'

export function ExtensionMainTable () {
  return <TableLayout columns={[{ text: 'UA' }, { text: 'Código' }, { text: 'Nombre', className: 'w-3/4' }, { text: 'Estado' }, { text: 'Carreras' }, { text: 'Acciones' }]}>

  </TableLayout>
}
