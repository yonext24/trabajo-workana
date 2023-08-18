import { useEffect, useState } from 'react'
import { DownArrowIcon } from '../icons'

export function SelectInput ({ options, defaultValue = null, handleOptionClick }) {
  const [value, setValue] = useState(defaultValue || options ? options[0] : '')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleClick = () => {
      setOpen(false)
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const handleChange = (selected) => {
    setValue(selected)
    handleOptionClick(selected)
  }

  return <div className="relative w-full">
    <div onClick={(e) => { e.stopPropagation(); setOpen(!open) }} id='fake-select' className="cursor-default text-lg pl-4
    border-2 border-black rounded-md flex w-full overflow-hidden">
      <div className='flex-1 text-left'>
        <span className='block py-px'>{value.text}</span>
      </div>
      <div className={`border-l-2 border-black px-4 flex items-center transition-colors ${open ? 'bg-azulfondo  text-white' : 'bg-gris  text-black'}`}>
        <DownArrowIcon className='h-4 w-4' />
      </div>
    </div>
    {
      open && <ul className='absolute w-full bottom-0 left-0 translate-y-[calc(100%+5px)] border border-black block rounded-md shadow-md
      overflow-hidden'>
        {
          options.map(({ value, text }) => (
            <li
              className='bg-azulfondo text-white hover:bg-white hover:text-black py-1 px-3 transition-colors'
              key={value}
              onClick={() => handleChange({ value, text })}
            >
              {text}
            </li>)
          )
        }
      </ul>
    }
  </div>
}
