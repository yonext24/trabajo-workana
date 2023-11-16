import { useSelector } from 'react-redux'
import { Pagination } from '../pagination'
import { SeeAmount } from '../see-amount'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'

export function CarreraPagination() {
  const { page, pages, size } = useSelector(s => s.ofertaAcademica.carrera.carrera.paginationData)
  const { setCarreraCarreraPaginationData } = useOfertaAcademicaActions()

  const handlePageChange = page => {
    setCarreraCarreraPaginationData({ page })
  }
  const handleSizeChange = nSize => {
    setCarreraCarreraPaginationData({ size: nSize })
  }

  return (
    <div className="flex w-full justify-between">
      <Pagination page={page} pages={pages} handlePageChange={handlePageChange} />
      <SeeAmount handleChange={handleSizeChange} currentAmount={size} />
    </div>
  )
}
