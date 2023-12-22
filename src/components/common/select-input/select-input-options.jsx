import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { valueParser } from './select-input'

export const SelectInputOptions = ({ options, show, handleChange, closeSelf, selectRef, currentIndex }) => {
  const ulRef = useRef(null)
  const screenHeight = useSelector(s => s.layout.screenData.height)

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        ulRef.current &&
        !ulRef.current.contains(e.target) &&
        selectRef.current &&
        !selectRef.current.contains(e.target)
      )
        closeSelf()
    }
    document.addEventListener('mouseup', handleClickOutside)

    const data = ulRef.current.getBoundingClientRect()
    const offSet = data.bottom - screenHeight
    if (offSet > 0) ulRef.current.style.marginBottom = `${offSet}px`

    return () => document.removeEventListener('mouseup', handleClickOutside)
  }, [ulRef.current])

  return (
    <ul
      ref={ulRef}
      className="absolute z-10 w-full bottom-0 left-0 translate-y-[calc(100%+5px)] border border-black block rounded-md shadow-md
      overflow-hidden"
    >
      {options.map((data, i) => {
        const value = valueParser(data, show)

        return (
          <li
            className="bg-azulfondo text-white hover:bg-white hover:text-black py-1 px-3 select-none capitalize
            data-[selected=true]:bg-gray-700"
            data-selected={currentIndex === i}
            key={i}
            onClick={() => handleChange(data, i)}
          >
            {value}
          </li>
        )
      })}
    </ul>
  )
}
