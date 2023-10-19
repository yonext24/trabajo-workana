import { useHovering } from '@/hooks/useHovering'
import { InfoIcon } from '../icons'

export function ErrorWarning ({ err }) {
  const { elementRef, hovering } = useHovering()
  if (!err) return null

  return <>
    <div className='relative' ref={elementRef}>

      <div className='flex p-1 self-center rounded-full bg-red-500 text-white'>
        <InfoIcon className='h-6 w-6' />
      </div>
      {
        hovering && <div className='absolute -top-1 -left-2 animate-appear -translate-x-full bg-red-500 text-white p-2 rounded-md z-10
        w-[300px]'>
          <p>{err}</p>
        </div>
      }
    </div>
  </>
}
