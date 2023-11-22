import { SwitchButton } from '@/components/common/table-buttons'
import { RecursoUpdateModal } from '@/components/modals/oferta-academica/carrera/recurso/recurso-update-modal'
import { Row } from '@/components/tables/row'
import { RowLayout } from '@/components/tables/row-layout'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function RecursoTableRow(props) {
  const { tipo, nombre, descripcion, permissions, estado, id_recurso, fromCarrera, selectFunction } = props
  const checked = props?.checked

  const { switchCarreraRecurso } = useOfertaAcademicaActions()
  const { handleUpd } = useTableDefaultModals({
    place: 'recurso',
    update: { el: RecursoUpdateModal, ...props }
  })

  const { UPDATE } = permissions
  const actions =
    UPDATE && !fromCarrera
      ? [
          { type: 'switch', onClick: async () => switchCarreraRecurso({ estado, id_recurso }), estado },
          { type: 'update', onClick: handleUpd }
        ]
      : []

  return (
    <RowLayout data-disabled={!estado}>
      <td className="border-r">{tipo}</td>
      <td className="border-r">{nombre}</td>
      {!fromCarrera && <td className="border-r">{descripcion}</td>}
      {selectFunction && (
        <td>
          <div className="flex justify-center">
            <SwitchButton
              text="Quitar/Agregar"
              customState={checked}
              handleClick={() => {
                selectFunction(props)
              }}
            />
          </div>
        </td>
      )}
      <Row actions={actions} />
    </RowLayout>
  )
}
