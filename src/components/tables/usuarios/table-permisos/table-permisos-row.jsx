import { RowLayout } from '../../row-layout'
import { Row } from '../../row'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { SwitchButton } from '@/components/common/table-buttons'

export function TablePermisosRow({
  modulo,
  operacion,
  unidad,
  extension,
  nivel,
  id_permiso,
  estado,
  withActions = true,
  selectFunction,
  permissions
}) {
  const { switchPermissionState } = useUsuariosActions()

  const { UPDATE } = permissions

  const toConcat = withActions
    ? [
        {
          id: 6,
          actions: UPDATE
            ? [
                {
                  type: 'switch',
                  onClick: () => {
                    switchPermissionState({ id_permiso, estado })
                  },
                  estado
                }
              ]
            : []
        }
      ]
    : []

  const rows = [
    { text: modulo, id: 1 },
    { text: operacion, id: 2 },
    { text: unidad === 0 ? '-' : unidad, id: 3 },
    { text: extension === 0 ? '-' : extension, id: 4 },
    { text: nivel === 0 ? '-' : nivel, id: 5 }
  ].concat(toConcat)

  return (
    <RowLayout>
      {rows.map(el => (
        <Row key={el.id} {...el}></Row>
      ))}
      {selectFunction && (
        <td>
          <div className="flex justify-center">
            <SwitchButton text="Quitar/Agregar" handleClick={() => {}} />
          </div>
        </td>
      )}
    </RowLayout>
  )
}
