import { useEffect, useRef, useState } from 'react'

export function useHovering () {
  const [hovering, setHovering] = useState(false)

  const elementRef = useRef(null)

  const handleMouseEnter = () => setHovering(true)
  const handleMouseLeave = () => setHovering(false)

  useEffect(() => {
    const node = elementRef.current
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter)
      node.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter)
        node.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [elementRef.current])

  return { elementRef, hovering }
}
