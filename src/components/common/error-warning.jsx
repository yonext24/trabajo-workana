import { useHovering } from '@/hooks/useHovering'
import { InfoIcon } from '../icons'
import { useSelector } from 'react-redux'
import debounce from 'just-debounce-it'
import { useCallback, useEffect, useState } from 'react'

export function ErrorWarning({ err }) {
  const [side, setSide] = useState('left')
  const { elementRef, hovering } = useHovering()

  const width = useSelector(s => s.layout.screenData.width)

  const debouncedChangeSideFunction = useCallback(
    debounce(width => {
      if (!elementRef.current) return
      const { left } = elementRef.current.getBoundingClientRect()

      if (left < width / 2) {
        setSide('right')
        return
      }
      setSide('left')
    }, 100),
    []
  )

  useEffect(() => {
    debouncedChangeSideFunction(width)
  }, [width])

  return (
    <>
      <div className="relative" ref={elementRef}>
        {err && (
          <>
            {hovering && (
              <div
                style={{ [side]: '-5px', transform: `translateX(${side === 'right' ? '' : '-'}100%)` }}
                className="absolute -top-1 animate-appear -translate-x-full bg-red-500 text-white p-2 rounded-md z-10
          w-[300px]"
              >
                <p>{String(err?.message ?? err)}</p>
              </div>
            )}
            <div className="flex p-1 self-center rounded-full bg-red-500 text-white">
              <InfoIcon className="h-6 w-6" />
            </div>
          </>
        )}
      </div>
    </>
  )
}
