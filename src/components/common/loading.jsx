import { Spinner } from './spinner'

export function Loading() {
  return (
    <div className="absolute w-full h-full left-0 top-0 bg-negro/40 flex justify-center items-center">
      <Spinner />
    </div>
  )
}
