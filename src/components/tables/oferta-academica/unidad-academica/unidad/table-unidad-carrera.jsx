import { parseEstado } from '@/utils/consts'
import { usePermissions } from '@/hooks/usePermissions'
import { useLayoutActions } from '@/hooks/useLayoutActions'
import { RowLayout } from '@/components/tables/row-layout'
import { Row } from '@/components/tables/row'
import { TableLayout } from '@/components/tables/table-layout'
import { UnidadUpdateCarreraModal } from '@/components/modals/oferta-academica/unidad-academica/unidad/unidad-update-carrera-modal'

export function UnidadCarrerasTable({ data, loading, error, id_unidad, setCarrera, nivel, unidad }) {
  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { UPDATE } = permissions

  return (
    <TableLayout
      loading={loading}
      hardError={error}
      columns={[{ text: 'Código' }, { text: 'Carrera', className: 'w-1/2' }, { text: 'Estado' }, { text: 'Acción' }]}
    >
      {data.map(el => (
        <UnidadCarrerasTableRow
          key={el.id_carrera}
          setCarrera={setCarrera}
          {...el}
          id_unidad={id_unidad}
          unidad={unidad}
          nivel={nivel}
          UPDATE={UPDATE}
        />
      ))}
    </TableLayout>
  )
}

export function UnidadCarrerasTableRow(props) {
  const { codigo, estado, nombre, UPDATE } = props

  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const handleCarreraUpdate = () => {
    const modalId = 'update-carrera-unidad-modal'
    openModal({
      Element: UnidadUpdateCarreraModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        },
        carrera: nombre,
        ...props
      }
    })
  }

  const rows = [
    { id: 1, text: codigo, className: '!text-center' },
    { id: 2, text: nombre },
    { id: 3, text: parseEstado(estado), className: '!text-center' },
    { id: 5, carreras: UPDATE ? [{ type: 'see', onClick: handleCarreraUpdate }] : [] }
  ]

  return (
    <RowLayout data-disabled={!estado}>
      {rows.map(el => (
        <Row key={el.id} {...el} />
      ))}
    </RowLayout>
  )
}
