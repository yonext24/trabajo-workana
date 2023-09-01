import { useSelector } from 'react-redux'
import { TableLayout } from '../../table-layout'
import { ExtensionMainTableRow } from './extension-main-table-row'

export function ExtensionMainTable () {
  const { filtered } = useSelector(s => s.ofertaAcademica.extension)
  return <TableLayout columns={[{ text: 'UA' }, { text: 'Código' }, { text: 'Nombre', className: 'w-3/4' }, { text: 'Estado' }, { text: 'Carreras' }, { text: 'Acciones' }]}>
    {
      filtered.map(el => <ExtensionMainTableRow key={el.nombre} {...el} />)
    }
  </TableLayout>
}
