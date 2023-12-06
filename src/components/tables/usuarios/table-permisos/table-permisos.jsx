import { useSelector } from 'react-redux'
import { TableLayout } from '../../table-layout'
import { useEffect } from 'react'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { TablePermisosRow } from './table-permisos-row'
import { sortModules } from '@/utils/consts'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { general } from '@/utils/routes'

export function TablePermisos({ outsideData, columns = [], selectFunction = false, permissions }) {
  // eslint-disable-next-line no-unused-vars
  const loading = useSelector(state => state.usuarios.permisos.loading)
  const filtered = useSelector(state => state.usuarios.permisos.filtered)
  const revalidating = useSelector(state => state.usuarios.permisos.revalidating)

  const { getPermisos } = useUsuariosActions()
  const { loading: paramsLoading, data: paramsData } = useFetchLocalData({
    func: async () => await general.parametros(),
    initialData: { unidades: [], extensiones: [], niveles: [] },
    dependencies: []
  })

  useEffect(() => {
    if (!outsideData) getPermisos()
  }, [])

  return (
    <TableLayout
      loading={loading || paramsLoading}
      revalidating={revalidating}
      columns={[
        { text: 'Módulo' },
        { text: 'Operación' },
        { text: 'Unidad' },
        { text: 'Extensión' },
        { text: 'Nivel' },
        ...columns
      ]}
    >
      {outsideData
        ? sortModules(outsideData).map((el, i) => (
            <TablePermisosRow
              niveles={paramsData.niveles}
              extensiones={paramsData.extensiones}
              unidades={paramsData.unidades}
              permissions={permissions}
              key={i}
              withActions={false}
              selectFunction={selectFunction}
              {...el}
            />
          ))
        : filtered.map((el, i) => (
            <TablePermisosRow
              niveles={paramsData.niveles}
              extensiones={paramsData.extensiones}
              unidades={paramsData.unidades}
              permissions={permissions}
              key={i}
              withActions
              {...el}
            />
          ))}
    </TableLayout>
  )
}
