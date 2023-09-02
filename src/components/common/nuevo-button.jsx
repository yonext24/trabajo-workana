import { PlusRoundedIcon } from '../icons'

export function NuevoButton ({ handleClick, content = 'Nuevo' }) {
  return <button onClick={handleClick} className="text-button bg-gris-oscuro text-white w-max rounded-md flex gap-4 pl-4 pr-10 py-2 items-center">
    <PlusRoundedIcon className='h-8 w-8' />
    <span>{content}</span>
  </button>
}
