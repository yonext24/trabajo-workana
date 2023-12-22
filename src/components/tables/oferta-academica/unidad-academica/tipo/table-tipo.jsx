import { useSelector } from 'react-redux'
import { TableLayout } from '../../../table-layout'
import { TableTipoRow } from './table-tipo-row'
import { useEffect } from 'react'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'

export function TableTipo({ permissions }) {
  const { data, loading, revalidating } = useSelector(s => s.ofertaAcademica.unidadAcademica.tipo)

  const { getUnidadAcademicaTipos } = useOfertaAcademicaActions()

  useEffect(() => {
    getUnidadAcademicaTipos()
  }, [])

  return (
    <TableLayout
      columns={[{ text: 'Nombre' }, { text: 'Descripción' }, { text: 'Estado' }, { text: 'Acciones' }]}
      loading={loading}
      revalidating={revalidating}
    >
      {data.map(el => (
        <TableTipoRow permissions={permissions} key={el.id_tipo_ua} {...el} />
      ))}
    </TableLayout>
  )
}
