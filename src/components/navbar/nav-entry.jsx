import { useState, useMemo, useEffect } from 'react'
import { DownArrowIcon } from '../icons'
import { useNavigate } from 'react-router-dom'

export function RawEntry ({ text, Icon, isSub, open, noArrow = false, setOpen, href, closeModal, isSelected, handleClick }) {
  const navigate = useNavigate() // <- Not the best, i know

  const handleEntryClick = () => {
    if (handleClick) {
      handleClick()
      return
    }
    if (href) {
      navigate(href)
      closeModal && closeModal()
    }
    if (!isSub && !isSelected) {
      setOpen(prev => !prev)
    }
  }

  return <button onClick={handleEntryClick} className={`h-16 ${isSub ? 'ml-4' : ''} w-full hover:text-white
  transition-colors flex items-center justify-between text-gray-400 font-semibold ${isSelected ? 'text-white' : ''} ${isSub ? '' : ''}`}>
    <Icon className='h-6 w-6 mr-3' strokeWidth={2} />
    <div id='text-container' className="flex-1 text-start">
      <span>{text}</span>
    </div>
    {
      !noArrow && <DownArrowIcon className={`h-5 w-5 ${open ? '-rotate-90' : isSelected ? '-rotate-90' : ''} transition-transform`} />
    }
  </button>
}

export function NavEntry ({ text, Icon, sub, href = false, closeModal = false, isSelected = false }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(isSelected ?? false)
  }, [isSelected])

  // 64 Es el alto de cada uno de las entrys, entonces simplemente multiplico la cantidad de sub-entrys por su alto y tengo el alto
  // que van a tener, esto es para que haya una animación a la hora de apretar el botón
  const maxHeightValue = useMemo(() => sub ? sub.length * 64 : 0)

  return <div className="flex flex-col overflow-hidden">
    <RawEntry text={text} Icon={Icon} open={open} setOpen={setOpen} href={href} closeModal={closeModal} isSelected={isSelected} />
    <div style={{ maxHeight: open ? `${maxHeightValue}px` : '0px' }} className={'transition-all duration-300 overflow-hidden'}>
      {
        sub?.map(el => <RawEntry key={el.text} text={el.text} Icon={el.Icon} isSub={true} noArrow href={el.href} closeModal={closeModal}/>)
      }
    </div>
  </div>
}
