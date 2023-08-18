import { useState, useMemo } from 'react'
import { DownArrowIcon } from '../icons'
import { useNavigate } from 'react-router-dom'

export function RawEntry ({ text, Icon, isSub, handleClick, open, noArrow = false }) {
  return <button onClick={() => { handleClick() }} className={`h-16 ${isSub ? 'ml-4' : ''} w-full hover:text-white
  transition-colors flex items-center justify-between text-gray-400 font-semibold ${isSub ? '' : ''}`}>
    <Icon className='h-6 w-6 mr-3' strokeWidth={2} />
    <div id='text-container' className="flex-1 text-start">
      <span>{text}</span>
    </div>
    {
      !noArrow && <DownArrowIcon className={`h-5 w-5 ${open ? '' : '-rotate-90'} transition-transform`} />
    }
  </button>
}

export function NavEntry ({ text, Icon, sub, href = false, closeModal = false }) {
  const [open, setOpen] = useState(false)

  // 64 Es el alto de cada uno de las entrys, entonces simplemente multiplico la cantidad de sub-entrys por su alto y tengo el alto
  // que van a tener, esto es para que haya una animación a la hora de apretar el botón
  const maxHeightValue = useMemo(() => sub ? sub.length * 64 : 0)

  const navigate = useNavigate() // <- Not the best, i know
  const handleEntryClick = () => {
    if (href) {
      navigate(href)
      closeModal && closeModal()
      return
    }
    setOpen(prev => !prev)
  }

  return <div className="flex flex-col overflow-hidden">
    <RawEntry text={text} Icon={Icon} handleClick={handleEntryClick} open={open} />
    <div style={{ maxHeight: open ? `${maxHeightValue}px` : '0px' }} className={'transition-all duration-300 overflow-hidden'}>
      {
        sub?.map(el => <RawEntry key={el.text} text={el.text} Icon={el.Icon} isSub={true} />)
      }
    </div>
  </div>
}
