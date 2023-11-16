import { RowLayout } from '../../row-layout'
import { Row } from '../../row'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { SwitchButton } from '@/components/common/table-buttons'

const parsePermisoText = permiso => {
  if (permiso === -2) return '---'
  if (permiso === -1) return 'Todos'
  return permiso
}

export function TablePermisosRow(props) {
  const {
    modulo,
    operacion,
    unidad,
    extension,
    nivel,
    checked,
    id_permiso,
    estado,
    withActions = true,
    selectFunction,
    permissions
  } = props

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
    { text: parsePermisoText(unidad), id: 3 },
    { text: parsePermisoText(extension), id: 4 },
    { text: parsePermisoText(nivel), id: 5 }
  ].concat(toConcat)

  return (
    <RowLayout data-disabled={!estado}>
      {rows.map(el => (
        <Row key={el.id} {...el}></Row>
      ))}
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
    </RowLayout>
  )
}
