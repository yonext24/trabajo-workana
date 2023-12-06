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
    extensiones,
    niveles
  } = props

  const { switchPermissionState } = useUsuariosActions()

  const { currentUnidad, currentExtension, currentNivel } = useMemo(() => {
    const currentUnidad = unidades.find(u => u.id_unidad === unidad)?.abreviatura ?? unidad
    const currentExtension = extensiones.find(e => e.id_extension === extension)?.abreviatura ?? extension
    const currentNivel = niveles.find(n => n.id_nivel === nivel)?.nombre ?? nivel

    return { currentUnidad, currentExtension, currentNivel }
  }, [unidades, extensiones, unidad, extension])

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
    { text: parsePermisoText(currentNivel), id: 5 }
  ].concat(toConcat)

  return (
    <RowLayout data-disabled={estado === false}>
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
