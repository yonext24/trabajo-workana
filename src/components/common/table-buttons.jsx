import { EyeIcon, KeyIcon, PenIcon, PersonsIcon, Warn } from '../icons'
import { useHovering } from '@/hooks/useHovering'

const ButtonWrapper = ({ children, hovering, text }) => {
  return <div className='relative'>
    {
      hovering &&
      <div className='absolute -top-full left-1/2 -translate-x-1/2'>
        <div className='bg-zinc-700 text-white text-xs px-2 py-1 rounded-md animate-fade whitespace-nowrap'>
          {text}
        </div>
      </div>
      }
    {children}
  </div>
}

export function UpdateButton ({ handleClick, text = 'Crear', iconProps, ...props }) {
  const { hovering, elementRef } = useHovering()

  return <ButtonWrapper hovering={hovering} text={text}>
    <button ref={elementRef} onClick={handleClick} className="bg-verde text-white p-1 rounded-md" {...props}>
      <PenIcon className='h-5 w-5' {...iconProps} />
    </button>
  </ButtonWrapper>
}

export function DeactivateButton ({ handleClick, text = 'Desactivar/Activar', iconProps, ...props }) {
  const { hovering, elementRef } = useHovering()

  return <ButtonWrapper hovering={hovering} text={text}>
    <button ref={elementRef} onClick={handleClick} className="bg-orange-600 text-white p-1 rounded-md" {...props}>
      <Warn className='h-5 w-5' {...iconProps} />
    </button>
  </ButtonWrapper>
}

export function PermissionsButton ({ handleClick, text = 'Permisos', iconProps, ...props }) {
  const { hovering, elementRef } = useHovering()

  return <ButtonWrapper hovering={hovering} text={text}>
    <button ref={elementRef} onClick={handleClick} className='bg-neutral-800 text-white p-1 rounded-md' {...props}>
      <KeyIcon className='h-5 w-5' {...iconProps} />
    </button>
  </ButtonWrapper>
}
export function ChangeRoleButton ({ handleClick, text = 'Cambiar Rol', iconProps, ...props }) {
  const { hovering, elementRef } = useHovering()

  return <ButtonWrapper hovering={hovering} text={text}>
    <button ref={elementRef} onClick={handleClick} className='bg-neutral-800 text-white p-1 rounded-md' {...props}>
      <PersonsIcon className='h-5 w-5' {...iconProps} />
    </button>
  </ButtonWrapper>
}
export function SeeButton ({ handleClick, text = 'Ver', iconProps, ...props }) {
  const { hovering, elementRef } = useHovering()

  return <ButtonWrapper hovering={hovering} text={text}>
    <button ref={elementRef} onClick={handleClick} className='bg-neutral-800 text-white p-1 rounded-md' {...props}>
      <EyeIcon className='h-5 w-5' {...iconProps} />
    </button>
  </ButtonWrapper>
}
