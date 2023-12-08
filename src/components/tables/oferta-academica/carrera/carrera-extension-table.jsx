import { parseEstado } from '@/utils/consts'
import { Row } from '../../row'
import { RowLayout } from '../../row-layout'
import { TableLayout } from '../../table-layout'
import { usePermissions } from '@/hooks/usePermissions'
import { ExtensionUpdateCarreraModal } from '@/components/modals/oferta-academica/extension/extension-update-carrera-modal'
import { useLayoutActions } from '@/hooks/useLayoutActions'

export function CarreraExtensionTable({ data, loading, error, extension, unidad, id_extension, setCarrera }) {
  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })
  const { UPDATE } = permissions

  return (
    <TableLayout
      loading={loading}
      hardError={error}
      columns={[
        { text: 'Código' },
        { text: 'Carrera', className: 'w-1/2' },
        { text: 'Estado' },
        { text: 'Fecha de creación', className: 'w-1/3' },
        { text: 'Acción' }
      ]}
    >
      {data.map(el => (
        <ExtensionMainTableRow
          key={el.id_carrera}
          setCarrera={setCarrera}
          {...el}
          id_extension={id_extension}
          extension={extension}
          unidad={unidad}
          UPDATE={UPDATE}
        />
      ))}
    </TableLayout>
  )
}

export function ExtensionMainTableRow(props) {
  const { codigo, estado, fecha_creacion, nombre, UPDATE, setCarrera } = props

  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const handleCarreraUpdate = () => {
    const modalId = 'update-carrera-extension-modal'
    openModal({
      Element: ExtensionUpdateCarreraModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        },
        setCarrera,
        ...props
      }
    })
  }

  const rows = [
    { id: 1, text: codigo, className: '!text-center' },
    { id: 2, text: nombre },
    { id: 3, text: parseEstado(estado) },
    { id: 4, text: fecha_creacion, className: '!text-center' },
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
