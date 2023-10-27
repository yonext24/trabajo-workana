import { Spinner } from '@/components/common/spinner'

export function TableLoading({ loading }) {
  return (
    <div
      className={`absolute w-full h-full left-0 top-0 flex justify-center items-center
  pointer-events-none text-white transition-colors ${
    loading ? 'bg-azulfondo/90 pointer-events-auto' : ''
  }`}
    >
      {loading && <Spinner />}
    </div>
  )
}
