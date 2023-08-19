import { PlusRoundedIcon } from '../icons'

export function NuevoButton ({ handleClick }) {
  return <button onClick={handleClick} className="text-button bg-gris-oscuro text-white w-max rounded-md flex gap-2 px-6 py-1 items-center">
    <PlusRoundedIcon className='h-8 w-8' />
    <span>Nuevo</span>
  </button>
}
