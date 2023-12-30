// El nombre puede ser confuso, pero esta es la tabla que se utiliza en la modal de agregar carrera a extension.

import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { TableLayout } from '@/components/tables/table-layout'

export function PermisoExtensionSeeModalTable({ data, loading, error }) {
  return (
    <TableLayout
      columns={[{ text: 'Nombre' }, { text: 'Descripción', className: 'w-1/2' }]}
      loading={loading}
      hardError={error}
    >
      {data.map(el => {
        return (
          <RowLayout data-disabled={!el.estado} key={el.id_extension_permiso}>
            <Row text={el.nombre} />
            <Row text={el.descripcion} />
          </RowLayout>
        )
      })}
    </TableLayout>
  )
}

export function PermisoExtensionUpdateModalTable({ data, loading, error, onSwitch }) {
  return (
    <TableLayout
      columns={[{ text: 'Nombre' }, { text: 'Descripción', className: 'w-1/2' }, { text: 'Estado' }]}
      loading={loading}
      hardError={error}
    >
      {data.map(el => {
        return (
          <RowLayout data-disabled={!el.estado} key={el.id_permiso}>
            <Row text={el.nombre} />
            <Row text={el.descripcion} />
            <Row
              actions={[
                {
                  type: 'switch',
                  handleClick: newEstado => {
                    onSwitch({ ...el, estado: newEstado })
                  },
                  estado: el.estado
                }
              ]}
            />
          </RowLayout>
        )
      })}
    </TableLayout>
  )
}
