import { Spinner } from './spinner'

export function RevalidatingIndicator ({ className }) {
  return <Spinner className={`absolute top-6 right-6 !border-black !h-4 !w-4 !border-2 !border-b-white ${className ?? ''}`} />
}
