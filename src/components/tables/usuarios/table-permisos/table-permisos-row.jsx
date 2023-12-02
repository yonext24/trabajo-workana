import { RowLayout } from '../../row-layout'
import { Row } from '../../row'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { SwitchButton } from '@/components/common/table-buttons'
import { useMemo } from 'react'

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
    permissions,
    unidades,
    extensiones
  } = props

  const { switchPermissionState } = useUsuariosActions()

  const { currentUnidad, currentExtension } = useMemo(() => {
    const currentUnidad = unidades.find(u => u.id_unidad === unidad)?.nombre ?? unidad
    const currentExtension = extensiones.find(e => e.id_extension === extension)?.nombre ?? extension

    return { currentUnidad, currentExtension }
  }, [unidades, extensiones, unidad, extension])

  console.log({ unidades, extensiones, unidad, extension, currentExtension, currentUnidad })

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
    { text: parsePermisoText(currentUnidad), id: 3 },
    { text: parsePermisoText(currentExtension), id: 4 },
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
