import { useEffect, useState } from 'react'
import { DownArrowIcon } from '../icons'

export function SelectInput ({ options, defaultValue = null, firstOne = false, handleOptionClick }) {
  const [value, setValue] = useState(firstOne ? options[0] : defaultValue)
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
    setOpen(false)
    handleOptionClick(selected)
  }

  return <div className="relative w-full">
    <div onClick={(e) => { e.stopPropagation(); setOpen(!open) }} id='fake-select' className="cursor-default text-lg pl-4
    border-2 border-gris rounded-md flex w-full overflow-hidden">
      <div className='flex-1 text-left py-[2px]'>
        <span className='block py-px capitalize'>{value || 'Seleccionar'}</span>
      </div>
      <div className={`border-l-2 border-gris px-4 flex items-center transition-colors ${open ? 'bg-azulfondo  text-white' : 'bg-gris  text-black'}`}>
        <DownArrowIcon className='h-4 w-4' />
      </div>
    </div>
    {
      open && <ul className='absolute z-10 w-full bottom-0 left-0 translate-y-[calc(100%+5px)] border border-black block rounded-md shadow-md
      overflow-hidden'>
        {
          options.map((value) => (
            <li
              className='bg-azulfondo text-white hover:bg-white hover:text-black py-1 px-3 transition-colors select-none capitalize'
              key={value}
              onClick={() => handleChange(value)}
            >
              {value}
            </li>)
          )
        }
      </ul>
    }
  </div>
}
