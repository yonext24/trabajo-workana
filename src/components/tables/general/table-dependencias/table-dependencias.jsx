import { useSelector } from 'react-redux'
import { TableDependenciasRow } from './table-dependencias-row'
import { TableLayout } from '../../table-layout'
import { useDataActions } from '@/hooks/useDataActions'
import { useEffect } from 'react'
import { general } from '@/utils/routes'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'

const fetchDependencias = async () => {
  return await general.parametros().then(({ unidades }) => unidades)
}

export function TableDependencias({ permissions }) {
  const { getDependencias } = useDataActions()

  useEffect(() => {
    getDependencias()
  }, [])

  const { loading: unidadesLoading, data: unidades } = useFetchLocalData({
    func: fetchDependencias,
    dependencies: []
  })

  const { filtered, revalidating, loading } = useSelector(s => s.data.dependencias)

  return (
    <TableLayout
      loading={loading}
      revalidating={revalidating || unidadesLoading}
      columns={['Sector', 'Nombre', 'Abreviatura', 'Unidad', 'Estado', 'Acciones'].map(el => ({ text: el }))}
    >
      {filtered.map(row => {
        return <TableDependenciasRow permissions={permissions} {...row} key={row.id_dependencia} unidades={unidades} />
      })}
    </TableLayout>
  )
}
