import { EyeIcon, KeyIcon, PenIcon, PersonsIcon, Plus, PlusRoundedIcon, RecycleIcon, SearchIcon, Warn } from '../icons'
import { useHovering } from '@/hooks/useHovering'

const ButtonWrapper = ({ children, hovering, text, style }) => {
  return (
    <div className="relative w-max h-max">
      {hovering && (
        <div style={style} className={`absolute -top-full left-1/2 -translate-x-1/2 z-[100]`}>
          <div className="bg-zinc-700 text-white text-xs px-2 py-1 rounded-md animate-fade whitespace-nowrap">
            {text}
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export function UpdateButton({ handleClick, text = 'Actualizar', iconProps, ...props }) {
  const { hovering, elementRef } = useHovering()

  return (
    <ButtonWrapper hovering={hovering} text={text}>
      <button ref={elementRef} onClick={handleClick} className="bg-verde text-white p-1 rounded-md" {...props}>
        <PenIcon className="h-5 w-5" {...iconProps} />
      </button>
    </ButtonWrapper>
  )
}

export function DeactivateButton({ handleClick, text = 'Desactivar', iconProps, ...props }) {
  const { hovering, elementRef } = useHovering()

  return (
    <ButtonWrapper hovering={hovering} text={text}>
      <button ref={elementRef} onClick={handleClick} className="bg-orange-600 text-white p-1 rounded-md" {...props}>
        <Warn className="h-5 w-5" {...iconProps} />
      </button>
    </ButtonWrapper>
  )
}

export function PermissionsButton({ handleClick, text = 'Permisos', iconProps, ...props }) {
  const { hovering, elementRef } = useHovering()

  return (
    <ButtonWrapper hovering={hovering} text={text}>
      <button ref={elementRef} onClick={handleClick} className="bg-neutral-800 text-white p-1 rounded-md" {...props}>
        <KeyIcon className="h-5 w-5" {...iconProps} />
      </button>
    </ButtonWrapper>
  )
}
export function ChangeRoleButton({ handleClick, text = 'Cambiar Rol', iconProps, ...props }) {
  const { hovering, elementRef } = useHovering()

  return (
    <ButtonWrapper hovering={hovering} text={text}>
      <button ref={elementRef} onClick={handleClick} className="bg-neutral-800 text-white p-1 rounded-md" {...props}>
        <PersonsIcon className="h-5 w-5" {...iconProps} />
      </button>
    </ButtonWrapper>
  )
}
export function SeeButton({ handleClick, text = 'Ver', iconProps, ...props }) {
  const { hovering, elementRef } = useHovering()

  return (
    <ButtonWrapper hovering={hovering} text={text}>
      <button ref={elementRef} onClick={handleClick} className="bg-neutral-800 text-white p-1 rounded-md" {...props}>
        <EyeIcon className="h-5 w-5" {...iconProps} />
      </button>
    </ButtonWrapper>
  )
}

export function SwitchButton({
  handleClick,
  text = 'Desactivado/Activado',
  estado,
  disabled,
  customState, // CustomState se utiliza para setear el estado del switch desde afuera sin depender de "estado",
  // se utiliza en la modal de actualizar permisos de rol.
  ...props
}) {
  const { hovering, elementRef } = useHovering()

  const FState = customState !== undefined ? customState : estado

  return (
    <ButtonWrapper hovering={hovering} text={text}>
      <button
        type="button"
        ref={elementRef}
        onClick={() => {
          if (disabled) return
          handleClick(!FState)
        }}
        data-disabled={disabled}
        className="bg-black rounded-full p-1 w-[45px] h-[25px] data-[disabled=true]:cursor-not-allowed"
        {...props}
      >
        <div className="relative w-full h-full">
          <div
            className={`absolute top-0 h-full aspect-square rounded-full transition-[left] bg-white ${
              FState ? 'left-[20px]' : 'left-0'
            }`}
          />
        </div>
      </button>
    </ButtonWrapper>
  )
}

export const AddCarreraButton = ({ handleClick, text = 'Agregar carrera' }) => {
  const { hovering, elementRef } = useHovering()

  return (
    <ButtonWrapper hovering={hovering} text={text}>
      <button ref={elementRef} onClick={handleClick} className="bg-verde text-white p-1 rounded-md">
        <Plus className="h-5 w-5" />
      </button>
    </ButtonWrapper>
  )
}

export const UpdateExtensionCarreraButton = ({ handleClick, text = 'Actualizar Carrera' }) => {
  const { hovering, elementRef } = useHovering()

  return (
    <ButtonWrapper hovering={hovering} text={text}>
      <button ref={elementRef} onClick={handleClick} className="bg-red-500 text-white p-1 rounded-full">
        <RecycleIcon className="h-5 w-5" />
      </button>
    </ButtonWrapper>
  )
}

export const SeeMoreOfUserButton = ({ handleClick, text = 'Ver más', style = {} }) => {
  const { hovering, elementRef } = useHovering()

  return (
    <ButtonWrapper style={style} hovering={hovering} text={text}>
      <button
        onClick={handleClick}
        ref={elementRef}
        className="bg-neutral-800 text-white p-1 self-start -mt-7 rounded-md"
      >
        <PlusRoundedIcon className="h-6 w-6" />
      </button>
    </ButtonWrapper>
  )
}

export const SearchButton = ({ handleClick, disabled, type = 'submit', text = 'Buscar', style = {} }) => {
  const { hovering, elementRef } = useHovering()

  return (
    <ButtonWrapper style={style} hovering={hovering} text={text}>
      <button
        disabled={disabled}
        type={type}
        onClick={handleClick}
        ref={elementRef}
        className="bg-gray-800 p-1 rounded-lg ml-1"
      >
        <SearchIcon className="h-7 w-7 text-white" />
      </button>
    </ButtonWrapper>
  )
}
