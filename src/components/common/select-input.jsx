import { useEffect, useState } from 'react'
import { DownArrowIcon } from '../icons'

export function SelectInput ({ options, defaultValue = null, firstOne = false, handleOptionClick, disabled }) {
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
    if (disabled) return
    setValue(selected)
    setOpen(false)
    handleOptionClick(selected)
  }

  const handleClick = (e) => {
    e.stopPropagation()
    if (disabled) return
    setOpen(!open)
  }

  return <div className="relative w-full">
    <div onClick={handleClick} id='fake-select' data-disabled={disabled} className="cursor-default text-lg pl-4
    border-2 border-gris rounded-md flex w-full overflow-hidden data-[disabled]:shadow-lg data-[disabled]:cursor-not-allowed">
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
          options.map((data) => {
            const value = typeof data === 'string' ? data : data.text
            console.log(value, data)

            return <li
              className='bg-azulfondo text-white hover:bg-white hover:text-black py-1 px-3 transition-colors select-none capitalize'
              key={value}
              onClick={() => handleChange(data)}
            >
              {value}
            </li>
          }
          )
        }
      </ul>
    }
  </div>
}
