import { useSelector } from 'react-redux'
import { Pagination } from '../pagination'
import { useGeografiaActions } from '@/hooks/useGeografiaActions'
import { SeeAmount } from '../see-amount'

export function GeografiaPagination() {
  const { pages, page, size } = useSelector(s => s.geografia.paginationData)

  const { setGeoPaginationData } = useGeografiaActions()

  const handlePageChange = page => {
    setGeoPaginationData({ page })
  }
  const handleSizeChange = size => {
    setGeoPaginationData({ size })
  }

  return (
    <div className="flex justify-between w-full items-center">
      <Pagination page={page} pages={pages} handlePageChange={handlePageChange} />
      <SeeAmount currentAmount={size} handleChange={handleSizeChange} />
    </div>
  )
}
