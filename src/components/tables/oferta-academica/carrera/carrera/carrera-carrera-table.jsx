import { TableLayout } from '@/components/tables/table-layout'
import { useSelector } from 'react-redux'
import { CarreraCarreraTableRow } from './carrera-carrera-table-row'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useEffect } from 'react'

export function CarreraCarreraTable({ permissions }) {
  const { getCarreraCarreraData } = useOfertaAcademicaActions()

  const { data, loading, revalidating, paginationData } = useSelector(s => s.ofertaAcademica.carrera.carrera)
  const { size, pages, page, nivel } = paginationData

  useEffect(() => {
    if (!nivel) return

    getCarreraCarreraData(paginationData)
  }, [size, pages, page, nivel])

  console.log(data)

  return (
    <TableLayout
      loading={loading}
      revalidating={revalidating}
      columns={[{ text: 'Nivel' }, { text: 'Carrera', className: 'w-full' }, { text: 'Estado' }, { text: 'Acciones' }]}
    >
      {data.map(el => (
        <CarreraCarreraTableRow permissions={permissions} key={el.id_carrera} {...el} />
      ))}
    </TableLayout>
  )
}
